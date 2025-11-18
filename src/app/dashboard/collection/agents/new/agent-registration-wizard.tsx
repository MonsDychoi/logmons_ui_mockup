'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// 3-step wizard based on storyboard
const steps = [
  { number: 1, title: '기본 정보', description: '에이전트 기본 정보를 입력합니다' },
  { number: 2, title: '설치 정보', description: '에이전트 설치 정보를 입력합니다' },
  { number: 3, title: '확인', description: '입력한 정보를 확인합니다' }
];

interface AgentFormData {
  // Step 1: Basic Info
  name: string;
  serverIp: string;
  description: string;

  // Step 2: Installation Info
  installPath: string;
  version: string;
  port: string;
  osType: string;
}

export function AgentRegistrationWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    serverIp: '',
    description: '',
    installPath: '/opt/logmons/agent',
    version: 'v2.4.1',
    port: '5000',
    osType: 'linux'
  });

  const updateFormData = (field: keyof AgentFormData, value: string) => {
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

  const handleSubmit = () => {
    // In real app, this would submit to API
    console.log('Submitting agent registration:', formData);
    router.push('/dashboard/collection/agents');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">에이전트명 *</Label>
              <Input
                id="name"
                placeholder="예: Log-01"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serverIp">서버 IP *</Label>
              <Input
                id="serverIp"
                placeholder="예: 10.0.0.1"
                value={formData.serverIp}
                onChange={(e) => updateFormData('serverIp', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="에이전트에 대한 설명을 입력하세요"
                rows={4}
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="installPath">설치 경로 *</Label>
              <Input
                id="installPath"
                placeholder="/opt/logmons/agent"
                value={formData.installPath}
                onChange={(e) => updateFormData('installPath', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">버전 *</Label>
              <Select
                value={formData.version}
                onValueChange={(value) => updateFormData('version', value)}
              >
                <SelectTrigger id="version">
                  <SelectValue placeholder="버전 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v2.4.1">v2.4.1 (최신)</SelectItem>
                  <SelectItem value="v2.4.0">v2.4.0</SelectItem>
                  <SelectItem value="v2.3.8">v2.3.8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">포트 *</Label>
              <Input
                id="port"
                placeholder="5000"
                value={formData.port}
                onChange={(e) => updateFormData('port', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="osType">운영체제 *</Label>
              <Select
                value={formData.osType}
                onValueChange={(value) => updateFormData('osType', value)}
              >
                <SelectTrigger id="osType">
                  <SelectValue placeholder="운영체제 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linux">Linux</SelectItem>
                  <SelectItem value="windows">Windows</SelectItem>
                  <SelectItem value="macos">macOS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">기본 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">에이전트명</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">서버 IP</span>
                  <span className="font-medium">{formData.serverIp}</span>
                </div>
                {formData.description && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">설명</span>
                    <span className="font-medium">{formData.description}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">설치 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">설치 경로</span>
                  <span className="font-medium">{formData.installPath}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">버전</span>
                  <span className="font-medium">{formData.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">포트</span>
                  <span className="font-medium">{formData.port}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">운영체제</span>
                  <span className="font-medium capitalize">{formData.osType}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.serverIp;
      case 2:
        return (
          formData.installPath &&
          formData.version &&
          formData.port &&
          formData.osType
        );
      case 3:
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
                    'text-sm font-medium',
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
                  'h-0.5 flex-1 mx-4 mt-[-30px]',
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
            onClick={() => router.push('/dashboard/collection/agents')}
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
