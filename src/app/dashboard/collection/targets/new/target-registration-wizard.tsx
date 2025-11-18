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
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// 5-step wizard based on storyboard
const steps = [
  { number: 1, title: '기본 정보', description: '수집 대상의 기본 정보를 입력합니다' },
  { number: 2, title: '대상 유형', description: '수집 대상의 유형을 선택합니다' },
  { number: 3, title: '수집 설정', description: '수집 방식과 주기를 설정합니다' },
  { number: 4, title: '파싱 규칙', description: '로그 파싱 규칙을 설정합니다' },
  { number: 5, title: '확인', description: '입력한 정보를 확인합니다' }
];

interface TargetFormData {
  // Step 1: Basic Info
  name: string;
  agentId: string;
  description: string;

  // Step 2: Target Type
  targetType: string;
  filePath: string;
  databaseType: string;
  connectionString: string;

  // Step 3: Collection Settings
  collectionMethod: string;
  collectionInterval: string;
  bufferSize: string;

  // Step 4: Parsing Rules
  parserType: string;
  delimiter: string;
  timestampFormat: string;
  customPattern: string;

  // Additional options
  enableCompression: boolean;
  enableEncryption: boolean;
}

export function TargetRegistrationWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TargetFormData>({
    name: '',
    agentId: '',
    description: '',
    targetType: 'file',
    filePath: '',
    databaseType: '',
    connectionString: '',
    collectionMethod: 'tail',
    collectionInterval: '5',
    bufferSize: '1024',
    parserType: 'regex',
    delimiter: '\\n',
    timestampFormat: 'yyyy-MM-dd HH:mm:ss',
    customPattern: '',
    enableCompression: false,
    enableEncryption: false
  });

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

  const handleSubmit = () => {
    // In real app, this would submit to API
    console.log('Submitting target registration:', formData);
    router.push('/dashboard/collection/targets');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">대상명 *</Label>
              <Input
                id="name"
                placeholder="예: application.log"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agentId">에이전트 *</Label>
              <Select
                value={formData.agentId}
                onValueChange={(value) => updateFormData('agentId', value)}
              >
                <SelectTrigger id="agentId">
                  <SelectValue placeholder="에이전트 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Log-01 (10.0.0.1)</SelectItem>
                  <SelectItem value="2">Log-02 (10.0.0.2)</SelectItem>
                  <SelectItem value="5">Log-05 (10.0.0.3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="수집 대상에 대한 설명을 입력하세요"
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
              <Label htmlFor="targetType">대상 유형 *</Label>
              <Select
                value={formData.targetType}
                onValueChange={(value) => updateFormData('targetType', value)}
              >
                <SelectTrigger id="targetType">
                  <SelectValue placeholder="유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file">파일 (File)</SelectItem>
                  <SelectItem value="database">데이터베이스 (Database)</SelectItem>
                  <SelectItem value="system">시스템 로그 (System)</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.targetType === 'file' && (
              <div className="space-y-2">
                <Label htmlFor="filePath">파일 경로 *</Label>
                <Input
                  id="filePath"
                  placeholder="/var/log/application.log"
                  value={formData.filePath}
                  onChange={(e) => updateFormData('filePath', e.target.value)}
                />
              </div>
            )}

            {formData.targetType === 'database' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="databaseType">데이터베이스 유형 *</Label>
                  <Select
                    value={formData.databaseType}
                    onValueChange={(value) => updateFormData('databaseType', value)}
                  >
                    <SelectTrigger id="databaseType">
                      <SelectValue placeholder="DB 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                      <SelectItem value="oracle">Oracle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="connectionString">연결 문자열 *</Label>
                  <Input
                    id="connectionString"
                    placeholder="jdbc:mysql://localhost:3306/logs"
                    value={formData.connectionString}
                    onChange={(e) =>
                      updateFormData('connectionString', e.target.value)
                    }
                  />
                </div>
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="collectionMethod">수집 방식 *</Label>
              <Select
                value={formData.collectionMethod}
                onValueChange={(value) =>
                  updateFormData('collectionMethod', value)
                }
              >
                <SelectTrigger id="collectionMethod">
                  <SelectValue placeholder="수집 방식 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tail">Tail (실시간)</SelectItem>
                  <SelectItem value="batch">Batch (일괄)</SelectItem>
                  <SelectItem value="stream">Stream (스트림)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="collectionInterval">수집 주기 (초) *</Label>
              <Input
                id="collectionInterval"
                type="number"
                placeholder="5"
                value={formData.collectionInterval}
                onChange={(e) =>
                  updateFormData('collectionInterval', e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bufferSize">버퍼 크기 (KB) *</Label>
              <Input
                id="bufferSize"
                type="number"
                placeholder="1024"
                value={formData.bufferSize}
                onChange={(e) => updateFormData('bufferSize', e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="compression"
                  checked={formData.enableCompression}
                  onCheckedChange={(checked) =>
                    updateFormData('enableCompression', checked as boolean)
                  }
                />
                <Label
                  htmlFor="compression"
                  className="text-sm font-normal cursor-pointer"
                >
                  압축 전송 사용
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="encryption"
                  checked={formData.enableEncryption}
                  onCheckedChange={(checked) =>
                    updateFormData('enableEncryption', checked as boolean)
                  }
                />
                <Label
                  htmlFor="encryption"
                  className="text-sm font-normal cursor-pointer"
                >
                  암호화 전송 사용
                </Label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="parserType">파서 유형 *</Label>
              <Select
                value={formData.parserType}
                onValueChange={(value) => updateFormData('parserType', value)}
              >
                <SelectTrigger id="parserType">
                  <SelectValue placeholder="파서 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regex">정규표현식 (Regex)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="syslog">Syslog</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="delimiter">구분자</Label>
              <Input
                id="delimiter"
                placeholder="\n"
                value={formData.delimiter}
                onChange={(e) => updateFormData('delimiter', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timestampFormat">타임스탬프 형식 *</Label>
              <Input
                id="timestampFormat"
                placeholder="yyyy-MM-dd HH:mm:ss"
                value={formData.timestampFormat}
                onChange={(e) =>
                  updateFormData('timestampFormat', e.target.value)
                }
              />
            </div>
            {formData.parserType === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="customPattern">커스텀 패턴</Label>
                <Textarea
                  id="customPattern"
                  placeholder="커스텀 파싱 패턴을 입력하세요"
                  rows={4}
                  value={formData.customPattern}
                  onChange={(e) =>
                    updateFormData('customPattern', e.target.value)
                  }
                />
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">기본 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">대상명</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">에이전트</span>
                  <span className="font-medium">
                    {formData.agentId === '1' && 'Log-01 (10.0.0.1)'}
                    {formData.agentId === '2' && 'Log-02 (10.0.0.2)'}
                    {formData.agentId === '5' && 'Log-05 (10.0.0.3)'}
                  </span>
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
              <h3 className="text-sm font-semibold">대상 유형</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">유형</span>
                  <span className="font-medium capitalize">
                    {formData.targetType}
                  </span>
                </div>
                {formData.targetType === 'file' && formData.filePath && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">파일 경로</span>
                    <span className="font-medium">{formData.filePath}</span>
                  </div>
                )}
                {formData.targetType === 'database' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">DB 유형</span>
                      <span className="font-medium">{formData.databaseType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">연결 문자열</span>
                      <span className="font-medium text-xs">
                        {formData.connectionString}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">수집 설정</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">수집 방식</span>
                  <span className="font-medium">{formData.collectionMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">수집 주기</span>
                  <span className="font-medium">
                    {formData.collectionInterval}초
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">버퍼 크기</span>
                  <span className="font-medium">{formData.bufferSize}KB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">압축 전송</span>
                  <span className="font-medium">
                    {formData.enableCompression ? '사용' : '미사용'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">암호화 전송</span>
                  <span className="font-medium">
                    {formData.enableEncryption ? '사용' : '미사용'}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">파싱 규칙</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">파서 유형</span>
                  <span className="font-medium">{formData.parserType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">구분자</span>
                  <span className="font-medium">{formData.delimiter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">타임스탬프 형식</span>
                  <span className="font-medium">{formData.timestampFormat}</span>
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
        return formData.name && formData.agentId;
      case 2:
        if (formData.targetType === 'file') {
          return formData.filePath;
        }
        if (formData.targetType === 'database') {
          return formData.databaseType && formData.connectionString;
        }
        return true;
      case 3:
        return (
          formData.collectionMethod &&
          formData.collectionInterval &&
          formData.bufferSize
        );
      case 4:
        return formData.parserType && formData.timestampFormat;
      case 5:
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
            onClick={() => router.push('/dashboard/collection/targets')}
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
