'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

// Import Step components
import {
  Step1BasicInfo,
  Step2DetailSettings,
  Step3ParsingRules,
  Step4OutputSettings,
  Step5Confirmation,
  type Agent,
  type TargetFormData
} from './components';

// 5-step wizard based on storyboard pages 20-22
const steps = [
  { number: 1, title: '기본정보', description: '수집 대상의 기본 정보를 입력합니다' },
  { number: 2, title: '상세설정', description: '수집 대상의 상세 설정을 입력합니다' },
  { number: 3, title: '파싱규칙', description: '로그 파싱 규칙을 설정합니다' },
  { number: 4, title: '출력설정', description: '전송 채널 및 저장소를 설정합니다' },
  { number: 5, title: '등록완료', description: '입력한 정보를 확인합니다' }
];

export function TargetRegistrationWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [formData, setFormData] = useState<TargetFormData>({
    // Step 1
    name: '',
    agentId: '',
    description: '',
    // Step 2
    inputType: 'file',
    paths: [''],
    encoding: 'UTF-8',
    enableMultiline: false,
    multilinePattern: '',
    multilineNegate: 'true',
    multilineMatch: 'after',
    customFields: [],
    syslogFormat: 'auto',
    protocol: 'tcp',
    listenIp: '0.0.0.0',
    listenPort: '514',
    maxMessageSize: '10',
    tcpFraming: 'delimiter',
    tcpDelimiter: '\\n',
    tcpTimeout: '300',
    maxConnections: '0',
    udpReadBuffer: '65536',
    // Step 3
    parsingMethod: 'none',
    jsonKeysUnderRoot: false,
    jsonOverwriteKeys: true,
    jsonAddErrorKey: false,
    jsonTargetField: 'message',
    jsonStorageLocation: 'root',
    jsonNestedFieldName: 'parsed',
    csvColumns: [],
    csvDelimiter: ',',
    csvTrimLeadingSpace: false,
    dissectPattern: '',
    dissectTargetField: 'message',
    dissectTrimValues: '',
    dissectTemplate: 'custom',
    dissectTrimCharacters: '',
    sampleLog: '',
    // Step 4
    channelMode: 'auto',
    channelName: '',
    outputDestination: 'opensearch',
    indexPattern: '',
    dateFormat: 'YYYY/MM/DD'
  });

  // Fetch agents and set agent ID from URL parameter on mount
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { mockAPI } = await import('@/lib/mock-data/collection');
        const agentsData = await mockAPI.getAgents();
        setAgents(agentsData);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    fetchAgents();

    const agentId = searchParams.get('agent');
    if (agentId) {
      setFormData((prev) => ({ ...prev, agentId }));
    }
  }, [searchParams]);

  const updateFormData = (field: keyof TargetFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const { mockAPI } = await import('@/lib/mock-data/collection');

      // Prepare collection_config
      const collectionConfig = {
        input_type: formData.inputType,
        paths: formData.paths.filter(p => p.trim() !== ''),
        encoding: formData.encoding,
        enable_multiline: formData.enableMultiline,
        multiline_pattern: formData.multilinePattern,
        multiline_negate: formData.multilineNegate === 'true',
        multiline_match: formData.multilineMatch,
        syslog_format: formData.syslogFormat,
        protocol: formData.protocol,
        listen_ip: formData.listenIp,
        listen_port: formData.listenPort,
        parsing_method: formData.parsingMethod
      };

      // Create target using mock API
      await mockAPI.createTarget({
        agent_id: formData.agentId,
        name: formData.name,
        type: formData.inputType as 'file' | 'syslog' | 'tcp-udp',
        status: 'normal',
        collection_rate: '0',
        last_collected: '-',
        channel_name: formData.channelName || `log_mons_${formData.name}`,
        collection_config: collectionConfig
      });

      alert('수집 대상이 성공적으로 등록되었습니다.');
      router.push('/collection/targets');
    } catch (error: any) {
      console.error('Failed to submit target:', error);
      alert(`수집 대상 등록 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            formData={formData}
            updateFormData={updateFormData}
            setFormData={setFormData}
            agents={agents}
          />
        );

      case 2:
        return (
          <Step2DetailSettings
            formData={formData}
            updateFormData={updateFormData}
            setFormData={setFormData}
          />
        );

      case 3:
        return (
          <Step3ParsingRules
            formData={formData}
            updateFormData={updateFormData}
            setFormData={setFormData}
          />
        );

      case 4:
        return (
          <Step4OutputSettings
            formData={formData}
            updateFormData={updateFormData}
            setFormData={setFormData}
          />
        );

      case 5:
        return (
          <Step5Confirmation
            formData={formData}
            updateFormData={updateFormData}
            setFormData={setFormData}
            agents={agents}
          />
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        // Step 1: Basic Info
        return formData.name && formData.agentId;
      case 2:
        // Step 2: Detail Settings
        if (formData.inputType === 'file') {
          return formData.paths.some((p) => p.trim() !== '');
        }
        if (formData.inputType === 'syslog' || formData.inputType === 'tcp-udp') {
          return formData.listenIp && formData.listenPort;
        }
        return true;
      case 3:
        // Step 3: Parsing Rules - Always valid (parsing is optional)
        return true;
      case 4:
        // Step 4: Output Settings
        if (formData.channelMode === 'auto') {
          return formData.channelName.trim() !== '';
        }
        if (formData.channelMode === 'existing') {
          return formData.channelName !== '';
        }
        return true;
      case 5:
        // Step 5: Confirmation
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                  currentStep > step.number
                    ? 'border-[#3ecf8e] bg-[#3ecf8e] text-white'
                    : currentStep === step.number
                      ? 'border-[#3ecf8e] text-[#3ecf8e]'
                      : 'border-muted text-muted-foreground'
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    'text-xs font-medium',
                    currentStep === step.number
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-2 mt-[-30px]',
                  currentStep > step.number ? 'bg-[#3ecf8e]' : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].description}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[400px]">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          이전
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push('/collection/targets')}
          >
            취소
          </Button>
          {currentStep < steps.length ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90"
            >
              다음
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90"
            >
              <Check className="h-4 w-4 mr-1" />
              등록
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
