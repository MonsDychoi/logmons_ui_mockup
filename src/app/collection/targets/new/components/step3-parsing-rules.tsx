'use client';

import { useState } from 'react';
import { StepProps } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function Step3ParsingRules({ formData, updateFormData, setFormData }: StepProps) {
  // Sample Log Test State
  const [showParseResult, setShowParseResult] = useState(false);
  const [parseResult, setParseResult] = useState<any>(null);

  // Parse Test Handler
  const handleParseTest = () => {
    if (!formData.sampleLog.trim()) {
      setParseResult({ error: '샘플 로그를 입력해주세요.' });
      setShowParseResult(true);
      return;
    }

    try {
      if (formData.parsingMethod === 'json') {
        const parsed = JSON.parse(formData.sampleLog);
        setParseResult(parsed);
        setShowParseResult(true);
      } else if (formData.parsingMethod === 'dissect') {
        setParseResult({
          info: 'Dissect 패턴 파싱 시뮬레이션',
          pattern: formData.dissectPattern,
          sample: formData.sampleLog
        });
        setShowParseResult(true);
      } else {
        setParseResult({
          raw: formData.sampleLog,
          note: '파싱 없이 원본 그대로 전송됩니다.'
        });
        setShowParseResult(true);
      }
    } catch (error: any) {
      setParseResult({ error: error.message });
      setShowParseResult(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Parsing Method Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">방식</Label>
        <RadioGroup
          value={formData.parsingMethod}
          onValueChange={(value: 'none' | 'json' | 'dissect') =>
            updateFormData('parsingMethod', value)
          }
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dissect" id="dissect" />
            <Label htmlFor="dissect" className="font-normal cursor-pointer">
              패턴 파싱 (패턴을 정의하여 필드 추출)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="json" id="json" />
            <Label htmlFor="json" className="font-normal cursor-pointer">
              JSON 파싱 (JSON 형식 로그)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Dissect Pattern Parser */}
      {formData.parsingMethod === 'dissect' && (
        <div className="space-y-6 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-red-600">패턴 파싱 (Pattern Parser)</h4>
            <p className="text-xs text-muted-foreground">
              로그 형식에 맞춰 필드를 추출합니다
            </p>
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">템플릿 입력 * (필수)</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={formData.dissectTemplate === 'csv' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  updateFormData('dissectTemplate', 'csv');
                  updateFormData('dissectPattern', 'timestamp, level, logger, message');
                }}
              >
                CSV
              </Button>
              <Button
                type="button"
                variant={formData.dissectTemplate === 'tsv' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  updateFormData('dissectTemplate', 'tsv');
                  updateFormData('dissectPattern', 'timestamp, level, logger, message');
                }}
              >
                TSV
              </Button>
              <Button
                type="button"
                variant={formData.dissectTemplate === 'custom' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  updateFormData('dissectTemplate', 'custom');
                  updateFormData('dissectPattern', '');
                }}
              >
                직접 입력
              </Button>
            </div>
          </div>

          {/* CSV Template */}
          {formData.dissectTemplate === 'csv' && (
            <div className="space-y-3 p-3 border rounded-md bg-background">
              <Label className="text-sm font-medium">콤마로 입력 * (필수)</Label>
              <Input
                placeholder="name, age, city, date"
                value={formData.dissectPattern}
                onChange={(e) => updateFormData('dissectPattern', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                💡 쉼표(,)로 구분하여 필드명을 순서대로 입력하세요
              </p>
              <div className="p-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                <p className="text-xs text-green-700 dark:text-green-300">
                  ✅ 자동 생성되는 파싱 패턴:<br />
                  %&#123;{formData.dissectPattern.split(',').map(f => f.trim()).join('&#125;,%&#123;')}&#125;
                </p>
              </div>
            </div>
          )}

          {/* TSV Template */}
          {formData.dissectTemplate === 'tsv' && (
            <div className="space-y-3 p-3 border rounded-md bg-background">
              <Label className="text-sm font-medium">콤마로 입력 * (필수)</Label>
              <Input
                placeholder="timestamp, level, logger, message"
                value={formData.dissectPattern}
                onChange={(e) => updateFormData('dissectPattern', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                💡 쉼표(,)로 구분하여 필드명을 순서대로 입력하세요
              </p>
              <div className="p-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                <p className="text-xs text-green-700 dark:text-green-300">
                  ✅ 자동 생성되는 파싱 패턴:<br />
                  %&#123;{formData.dissectPattern.split(',').map(f => f.trim()).join('&#125;\t%&#123;')}&#125;
                </p>
              </div>
            </div>
          )}

          {/* Custom Pattern */}
          {formData.dissectTemplate === 'custom' && (
            <div className="space-y-3 p-3 border rounded-md bg-background">
              <Label className="text-sm font-medium">파싱 패턴 * (필수)</Label>
              <Textarea
                placeholder="%{ip} - %{user} [%{timestamp}] &quot;%{method} %{path}&quot;"
                rows={3}
                value={formData.dissectPattern}
                onChange={(e) => updateFormData('dissectPattern', e.target.value)}
                className="font-mono text-xs"
              />
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground font-semibold">패턴 작성 방법:</p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>- %&#123;필드명&#125;: 추출할 필드 정의</li>
                  <li>- 구분자: 토그의 구분자를 그대로 입력 (공백, -, [ ] 등)</li>
                </ul>
                <p className="text-blue-600 dark:text-blue-400">
                  • 공백 구분: &quot;%&#123;field1&#125; %&#123;field2&#125; %&#123;field3&#125;&quot;<br />
                  • 하이픈 구분: &quot;%&#123;ip&#125; - %&#123;user&#125;&quot;<br />
                  • 복잡 구분자: &quot;[%&#123;timestamp&#125;] &quot;%&#123;method&#125; %&#123;level&#125;: %&#123;msg&#125;&quot;
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* JSON Parser */}
      {formData.parsingMethod === 'json' && (
        <div className="space-y-6 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-green-600">JSON Parser</h4>
            <p className="text-xs text-muted-foreground">
              JSON 형식의 로그를 자동으로 필드로 분리합니다
            </p>
          </div>

          {/* 자동 처리 안내 */}
          <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
            <div className="text-green-600 mt-0.5">✓</div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                JSON 파싱이 자동으로 처리됩니다
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                로그 파일의 JSON 형식이 자동으로 개별 필드로 추출됩니다
              </p>
            </div>
          </div>

          {/* 처리 옵션 */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">처리 옵션 (선택, 디폴트 제공)</Label>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="json-overwrite"
                checked={formData.jsonOverwriteKeys}
                onCheckedChange={(checked) => updateFormData('jsonOverwriteKeys', checked as boolean)}
              />
              <Label htmlFor="json-overwrite" className="text-sm font-normal cursor-pointer">
                기존 필드 덮어쓰기 (overwrite_keys)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="json-add-error"
                checked={formData.jsonAddErrorKey}
                onCheckedChange={(checked) => updateFormData('jsonAddErrorKey', checked as boolean)}
              />
              <Label htmlFor="json-add-error" className="text-sm font-normal cursor-pointer">
                파싱 실패 시 에러 필드 추가 (add_error_key)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="json-drop-event"
                checked={false}
                disabled
              />
              <Label htmlFor="json-drop-event" className="text-sm font-normal text-muted-foreground">
                파싱 실패 시 이벤트 삭제 (on_failure: drop_event)
              </Label>
            </div>
          </div>

          {/* 고급 옵션 */}
          <div className="space-y-3 p-3 border rounded-md bg-background">
            <p className="text-sm font-semibold">고급 옵션</p>

            {/* 파싱 대상 필드 */}
            <div className="space-y-2">
              <Label htmlFor="json-target-field" className="text-sm">
                파싱 대상 필드 (선택, 디폴트: message)
              </Label>
              <Select
                value={formData.jsonTargetField}
                onValueChange={(value) => updateFormData('jsonTargetField', value)}
              >
                <SelectTrigger id="json-target-field">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="message">message</SelectItem>
                  <SelectItem value="log">log</SelectItem>
                  <SelectItem value="data">data</SelectItem>
                  <SelectItem value="@message">@message</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                💡 대부분 기본값(message)을 사용합니다
              </p>
              <p className="text-xs text-muted-foreground">
                💡 특수한 경우에만 변경하세요 (Kubernetes 로그: log 필드 등)
              </p>
            </div>

            {/* 파싱 결과 저장 위치 */}
            <div className="space-y-2">
              <Label className="text-sm">파싱 결과 저장 위치 (선택, 디폴트: 루트)</Label>
              <RadioGroup
                value={formData.jsonStorageLocation}
                onValueChange={(value: 'root' | 'nested') => updateFormData('jsonStorageLocation', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="root" id="json-root" />
                  <Label htmlFor="json-root" className="text-sm font-normal cursor-pointer">
                    루트 레벨에 저장 (권장)
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  예: &#123;&quot;level&quot;: &quot;info&quot;&#125; → level: &quot;info&quot;
                </p>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nested" id="json-nested" />
                  <Label htmlFor="json-nested" className="text-sm font-normal cursor-pointer">
                    특정 필드 아래 저장
                  </Label>
                </div>
                {formData.jsonStorageLocation === 'nested' && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="json-nested-field" className="text-xs">
                      필드명:
                    </Label>
                    <Input
                      id="json-nested-field"
                      placeholder="parsed"
                      value={formData.jsonNestedFieldName}
                      onChange={(e) => updateFormData('jsonNestedFieldName', e.target.value)}
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      예: &#123;&quot;level&quot;: &quot;info&quot;&#125; → parsed.level: &quot;info&quot;
                    </p>
                  </div>
                )}
              </RadioGroup>
            </div>
          </div>
        </div>
      )}

      {/* Sample Log Preview */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">미리보기 (샘플 로그 테스트)</Label>
        <div className="space-y-2">
          <Label htmlFor="sampleLog" className="text-sm">
            샘플 입력 :
          </Label>
          <Textarea
            id="sampleLog"
            placeholder='예: {"timestamp":"2024-01-15T10:30:45Z","level":"INFO","message":"User login","user":"admin","ip":"1.2.3.4"}'
            rows={4}
            value={formData.sampleLog}
            onChange={(e) => {
              updateFormData('sampleLog', e.target.value);
              setShowParseResult(false);
            }}
            className="font-mono text-xs"
          />
        </div>

        {/* Test Button */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleParseTest}
            variant="default"
            size="sm"
            disabled={!formData.sampleLog.trim()}
          >
            파싱 테스트
          </Button>
        </div>

        {/* Parse Result */}
        {showParseResult && parseResult && (
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">파싱 결과:</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowParseResult(false)}
                className="h-6 px-2"
              >
                닫기
              </Button>
            </div>

            {parseResult.error ? (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md">
                <p className="text-xs font-mono">{parseResult.error}</p>
              </div>
            ) : (
              <div className="p-3 bg-background rounded-md">
                <pre className="font-mono text-xs whitespace-pre-wrap break-all">
                  {JSON.stringify(parseResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Additional Processing Settings - Only shown when parsing test succeeds */}
      {showParseResult && parseResult && !parseResult.error && (
        <div className="space-y-6">
        <div className="space-y-1">
          <Label className="text-base font-semibold">추가 처리 설정</Label>
          <p className="text-sm text-muted-foreground">파싱 후 추가 처리가 필요한 경우 설정합니다</p>
        </div>

        {/* Timestamp Settings - Collapsible */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="timestamp-enabled"
                defaultChecked
                className="data-[state=checked]:bg-[#3ecf8e] data-[state=checked]:border-[#3ecf8e]"
              />
              <div>
                <Label htmlFor="timestamp-enabled" className="text-sm font-semibold cursor-pointer">
                  Timestamp 처리
                </Label>
                <p className="text-xs text-muted-foreground">로그의 시간 필드를 @timestamp로 변환</p>
              </div>
            </div>
          </div>

          {/* Timestamp Details - Shown when checked */}
          <div className="space-y-4 pl-7">
            <div className="grid gap-4">
              {/* Timestamp Field */}
              <div className="space-y-2">
                <Label htmlFor="timestamp-field" className="text-sm flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  시간 필드명
                </Label>
                <Input
                  id="timestamp-field"
                  placeholder="timestamp, @timestamp, time 등"
                  defaultValue=""
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">파싱된 로그에서 시간 정보가 포함된 필드명</p>
              </div>

              {/* Time Format */}
              <div className="space-y-2">
                <Label htmlFor="time-format" className="text-sm flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  시간 포맷
                </Label>
                <Input
                  id="time-format"
                  placeholder="2006-01-02 15:04:05"
                  defaultValue="2006-01-02 15:04:05"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Go 시간 포맷 또는 상수 사용 (RFC3339, RFC822 등)
                </p>
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-sm">타임존</Label>
                <Select defaultValue="Asia/Seoul">
                  <SelectTrigger id="timezone" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Seoul">Asia/Seoul</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ignore Failure Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="ignore-failure"
                  defaultChecked
                  className="data-[state=checked]:bg-[#3ecf8e] data-[state=checked]:border-[#3ecf8e]"
                />
                <Label htmlFor="ignore-failure" className="text-sm font-normal cursor-pointer">
                  파싱 실패 시 원본 유지
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Remove Fields - Collapsible */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="remove-fields-enabled"
                className="data-[state=checked]:bg-[#3ecf8e] data-[state=checked]:border-[#3ecf8e]"
              />
              <div>
                <Label htmlFor="remove-fields-enabled" className="text-sm font-semibold cursor-pointer">
                  불필요 필드 제거
                </Label>
                <p className="text-xs text-muted-foreground">파싱 후 필요없는 필드를 삭제</p>
              </div>
            </div>
          </div>

          {/* Remove Fields Details - Shown when checked */}
          <div className="space-y-3 pl-7">
            <p className="text-sm text-muted-foreground">파싱 결과에서 추출된 필드:</p>
            {(() => {
              // Extract fields from parse result
              const fields: string[] = [];
              if (parseResult && typeof parseResult === 'object' && !parseResult.error) {
                Object.keys(parseResult).forEach(key => {
                  if (key !== 'info' && key !== 'note' && key !== 'pattern' && key !== 'sample') {
                    fields.push(key);
                  }
                });
              }

              if (fields.length === 0) {
                return (
                  <p className="text-xs text-muted-foreground italic">
                    파싱 결과에서 필드를 찾을 수 없습니다
                  </p>
                );
              }

              return (
                <div className="grid grid-cols-2 gap-3">
                  {fields.map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={`field-${field}`}
                        className="data-[state=checked]:bg-[#3ecf8e] data-[state=checked]:border-[#3ecf8e]"
                      />
                      <Label htmlFor={`field-${field}`} className="text-sm font-normal cursor-pointer font-mono">
                        {field}
                      </Label>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
