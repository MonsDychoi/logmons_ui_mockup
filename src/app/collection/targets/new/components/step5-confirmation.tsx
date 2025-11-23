'use client';

import { Agent, StepProps, TargetFormData } from './types';
import { Check } from 'lucide-react';

interface Step5Props extends StepProps {
  agents: Agent[];
}

function generateFilebeatConfig(formData: TargetFormData): string {
  const config: string[] = ['filebeat.inputs:'];

  // Input Type
  if (formData.inputType === 'file') {
    config.push('  - type: filestream');
    config.push('    enabled: true');
    config.push('    paths:');
    formData.paths.filter(p => p.trim()).forEach(path => {
      config.push(`      - ${path}`);
    });

    if (formData.encoding) {
      config.push(`    encoding: ${formData.encoding}`);
    }

    // Multiline settings
    if (formData.enableMultiline && formData.multilinePattern) {
      config.push('    multiline:');
      config.push('      type: pattern');
      config.push(`      pattern: '${formData.multilinePattern}'`);
      config.push(`      negate: ${formData.multilineNegate}`);
      config.push(`      match: ${formData.multilineMatch}`);
    }
  } else if (formData.inputType === 'syslog') {
    config.push('  - type: syslog');
    config.push('    enabled: true');
    config.push(`    protocol.${formData.protocol}:`);
    config.push(`      host: "${formData.listenIp}:${formData.listenPort}"`);

    if (formData.syslogFormat && formData.syslogFormat !== 'auto') {
      config.push(`    format: ${formData.syslogFormat}`);
    }

    if (formData.maxMessageSize) {
      config.push(`    max_message_size: ${formData.maxMessageSize}${formData.protocol === 'udp' ? 'KiB' : 'MiB'}`);
    }
  } else if (formData.inputType === 'tcp-udp') {
    config.push(`  - type: ${formData.protocol}`);
    config.push('    enabled: true');
    config.push(`    host: "${formData.listenIp}:${formData.listenPort}"`);

    if (formData.maxMessageSize) {
      config.push(`    max_message_size: ${formData.maxMessageSize}${formData.protocol === 'udp' ? 'KiB' : 'MiB'}`);
    }
  }

  // Custom fields
  if (formData.customFields.length > 0) {
    config.push('    fields:');
    formData.customFields.forEach(field => {
      if (field.name && field.value) {
        config.push(`      ${field.name}: ${field.value}`);
      }
    });
    config.push('    fields_under_root: true');
  }

  // Processors
  const processors: string[] = [];

  // Parsing
  if (formData.parsingMethod === 'json') {
    processors.push('  - decode_json_fields:');
    processors.push(`      fields: ["${formData.jsonTargetField}"]`);
    processors.push(`      target: "${formData.jsonStorageLocation === 'root' ? '' : formData.jsonNestedFieldName}"`);
    if (formData.jsonOverwriteKeys) {
      processors.push('      overwrite_keys: true');
    }
    if (formData.jsonAddErrorKey) {
      processors.push('      add_error_key: true');
    }
  } else if (formData.parsingMethod === 'csv') {
    processors.push('  - dissect:');
    processors.push(`      tokenizer: "${formData.csvColumns.join(formData.csvDelimiter)}"`);
    processors.push(`      field: "message"`);
  } else if (formData.parsingMethod === 'dissect') {
    processors.push('  - dissect:');
    processors.push(`      tokenizer: "${formData.dissectPattern}"`);
    processors.push(`      field: "${formData.dissectTargetField}"`);
  }

  if (processors.length > 0) {
    config.push('');
    config.push('processors:');
    config.push(...processors);
  }

  // Output
  config.push('');
  config.push('output.kafka:');
  config.push('  hosts: ["kafka-broker:9092"]');
  config.push(`  topic: "${formData.channelName || 'log_mons_' + formData.name}"`);
  config.push('  partition.round_robin:');
  config.push('    reachable_only: false');
  config.push('  required_acks: 1');
  config.push('  compression: gzip');
  config.push('  max_message_bytes: 1000000');

  return config.join('\n');
}

export function Step5Confirmation({ formData, agents }: Step5Props) {
  const selectedAgent = agents.find((a) => a.id === formData.agentId);

  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
        <Check className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
          등록이 완료 되었습니다.
        </h3>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">에이젼트 명</h3>
        <p className="text-sm">
          {selectedAgent?.name} ({selectedAgent?.server_ip})
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">수집대상</h3>
        <p className="text-sm">{formData.name}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">유형</h3>
        <p className="text-sm capitalize">
          {formData.inputType === 'file' && '파일 로그'}
          {formData.inputType === 'syslog' && 'Syslog'}
          {formData.inputType === 'tcp-udp' && '네트워크 스트림(TCP/UDP)'}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">경로</h3>
        <div className="text-sm space-y-1">
          {formData.paths.filter((p) => p).map((path, i) => (
            <p key={i}>{path}</p>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">파싱</h3>
        <p className="text-sm capitalize">
          {formData.parsingMethod === 'none' && '파싱 안 함'}
          {formData.parsingMethod === 'json' && 'JSON'}
          {formData.parsingMethod === 'csv' && 'CSV'}
          {formData.parsingMethod === 'dissect' && 'Dissect'}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">전송채널</h3>
        <p className="text-sm">{formData.channelName || 'log_mons_' + formData.name}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">저장소</h3>
        <p className="text-sm">
          {formData.outputDestination === 'opensearch' &&
            `로그 분석 엔진 (${formData.indexPattern || 'log_mons_*'})`}
          {formData.outputDestination === 'database' && '데이터 베이스 저장'}
          {formData.outputDestination === 'file' && '파일 저장'}
        </p>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h4 className="text-sm font-semibold mb-3">Filebeat 설정 미리보기</h4>
        <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap bg-background p-4 rounded border">
          {generateFilebeatConfig(formData)}
        </pre>
      </div>
    </div>
  );
}
