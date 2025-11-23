// Shared types for Target Registration Wizard

export interface Agent {
  id: string;
  name: string;
  server_ip: string;
}

export interface CustomField {
  name: string;
  value: string;
}

export interface TargetFormData {
  // Step 1: Basic Info
  name: string;
  agentId: string;
  description: string;

  // Step 2: Detail Settings (상세설정)
  inputType: 'file' | 'syslog' | 'tcp-udp';
  paths: string[];
  encoding: string;
  enableMultiline: boolean;
  multilinePattern: string;
  multilineNegate: 'true' | 'false';
  multilineMatch: 'after' | 'before';
  customFields: CustomField[];

  // Syslog specific
  syslogFormat: 'auto' | 'rfc3164' | 'rfc5424';
  protocol: 'tcp' | 'udp';
  listenIp: string;
  listenPort: string;
  maxMessageSize: string;
  tcpFraming: 'delimiter' | 'rfc6587';
  tcpDelimiter: string;
  tcpTimeout: string;
  maxConnections: string;
  udpReadBuffer: string;

  // Step 3: Parsing Rules (파싱규칙)
  parsingMethod: 'none' | 'json' | 'csv' | 'dissect';
  // JSON specific
  jsonKeysUnderRoot: boolean;
  jsonOverwriteKeys: boolean;
  jsonAddErrorKey: boolean;
  jsonTargetField: string;
  jsonStorageLocation: 'root' | 'nested';
  jsonNestedFieldName: string;
  // CSV specific
  csvColumns: string[];
  csvDelimiter: string;
  csvTrimLeadingSpace: boolean;
  // Dissect specific
  dissectPattern: string;
  dissectTargetField: string;
  dissectTrimValues: string;
  dissectTemplate: string;
  dissectTrimCharacters: string;
  sampleLog: string;

  // Step 4: Output Settings (출력설정)
  channelMode: 'auto' | 'existing';
  channelName: string;
  outputDestination: 'opensearch' | 'database' | 'file';
  indexPattern: string;
  dateFormat: string;
}

export interface StepProps {
  formData: TargetFormData;
  updateFormData: (field: keyof TargetFormData, value: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<TargetFormData>>;
}
