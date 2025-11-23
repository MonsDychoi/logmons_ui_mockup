'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Check, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// 2-step wizard based on storyboard UI-LM-CA-003 ~ UI-LM-CA-005
const steps = [
  { number: 1, title: '기본 정보', description: '에이전트 기본 정보를 입력합니다' },
  { number: 2, title: '연결 테스트', description: '에이전트 연결 테스트를 진행합니다' }
];

interface FilebeatInfo {
  path: string;
  version: string;
}

interface AgentFormData {
  // Step 1: Basic Info (UI-LM-CA-003)
  name: string;
  serverIp: string;
  sshPort: string;
  installPaths: string[]; // Changed to array to support multiple paths
  description: string;

  // Step 2: Connection Test Result (UI-LM-CA-004)
  connectionStatus: 'testing' | 'success' | 'failed';
  filebeatDetected: boolean;
  filebeatList: FilebeatInfo[];
  selectedFilebeat?: string;
}

export function AgentRegistrationWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    serverIp: '',
    sshPort: '22',
    installPaths: ['/opt/logmons/agent'], // Start with one default path
    description: '',
    connectionStatus: 'testing',
    filebeatDetected: false,
    filebeatList: [],
    selectedFilebeat: undefined
  });

  const updateFormData = (field: keyof AgentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Path management functions
  const addPath = () => {
    setFormData((prev) => ({
      ...prev,
      installPaths: [...prev.installPaths, '']
    }));
  };

  const removePath = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      installPaths: prev.installPaths.filter((_, i) => i !== index)
    }));
  };

  const updatePath = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      installPaths: prev.installPaths.map((path, i) => (i === index ? value : path))
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Simulate connection test when moving to step 2
      setFormData((prev) => ({ ...prev, connectionStatus: 'testing' }));
      setCurrentStep(2);

      // Simulate connection test delay
      setTimeout(() => {
        // Mock: 70% chance of success
        const success = Math.random() > 0.3;

        if (success) {
          // Mock different scenarios for Filebeat detection
          const scenarios = [
            // Case 1: No Filebeat detected
            { detected: false, list: [] },
            // Case 2: One Filebeat detected (like page 13)
            {
              detected: true,
              list: [{ path: '/usr/share/filebeat', version: '8.13.0' }]
            },
            // Case 3: Multiple Filebeat detected (like page 14)
            {
              detected: true,
              list: [
                { path: '/usr/share/filebeat', version: '8.13.0' },
                { path: '/opt/filebeat', version: '8.12.1' }
              ]
            }
          ];

          // Randomly select a scenario
          const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

          setFormData((prev) => ({
            ...prev,
            connectionStatus: 'success',
            filebeatDetected: scenario.detected,
            filebeatList: scenario.list,
            selectedFilebeat: scenario.list.length > 0 ? scenario.list[0].path : undefined
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            connectionStatus: 'failed',
            filebeatDetected: false,
            filebeatList: [],
            selectedFilebeat: undefined
          }));
        }
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Get filebeat info
      const filebeatInfo = formData.filebeatList.find(
        (fb) => fb.path === formData.selectedFilebeat
      ) || formData.filebeatList[0];

      // Prepare data for API (matching agents table schema)
      const agentData = {
        name: formData.name,
        server_ip: formData.serverIp,
        version: filebeatInfo?.version || '',
        install_path: filebeatInfo?.path || formData.installPaths[0] || '',
        status: formData.connectionStatus === 'success' ? 'normal' : 'inactive',
        collection_rate: '0%',
        processed_events: 0,
        error_rate: '0%',
        last_connection: formData.connectionStatus === 'success' ? new Date().toISOString() : null
      };

      const response = await fetch('/api/collection/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agentData)
      });

      const result = await response.json();

      if (!result.success) {
        // Handle specific error cases
        const errorMsg = result.error || 'Failed to save agent';

        if (errorMsg.includes('duplicate key') || errorMsg.includes('agents_name_key')) {
          alert(`이미 존재하는 에이전트 이름입니다.\n에이전트명: "${formData.name}"\n\n다른 이름을 사용해주세요.`);
          setCurrentStep(1); // Go back to step 1 to change name
          return;
        }

        throw new Error(errorMsg);
      }

      console.log('Agent saved successfully:', result.data);

      // Navigate back to agents list after successful registration
      router.push('/collection/agents');
    } catch (error) {
      console.error('Error saving agent:', error);
      alert('에이전트 저장 중 오류가 발생했습니다:\n' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // UI-LM-CA-003: Step 01 - Basic Info
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
              <Label htmlFor="serverIp">IP 주소 *</Label>
              <Input
                id="serverIp"
                placeholder="예: 10.0.0.1"
                value={formData.serverIp}
                onChange={(e) => updateFormData('serverIp', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sshPort">SSH 연결 포트 (선택)</Label>
              <Input
                id="sshPort"
                placeholder="22"
                value={formData.sshPort}
                onChange={(e) => updateFormData('sshPort', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>PATH *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPath}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  경로 추가
                </Button>
              </div>
              <div className="space-y-2">
                {formData.installPaths.map((path, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="/opt/logmons/agent"
                      value={path}
                      onChange={(e) => updatePath(index, e.target.value)}
                    />
                    {formData.installPaths.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removePath(index)}
                        className="shrink-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="에이전트에 대한 설명을 입력하세요"
                rows={3}
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </div>

            {/* Info box per storyboard */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                연결 테스트 전 필수 준비사항
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                <li>서버에 SSH 접근 권한이 있어야 합니다</li>
                <li>방화벽에서 SSH 포트(기본: 22)가 열려있어야 합니다</li>
                <li>지정한 PATH에 대한 읽기/쓰기 권한이 필요합니다</li>
              </ul>
            </div>
          </div>
        );

      case 2:
        // UI-LM-CA-004: Step 02 - Connection Test
        return (
          <div className="space-y-6">
            {formData.connectionStatus === 'testing' && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3ecf8e] mb-4" />
                <p className="text-sm text-muted-foreground">연결 테스트 진행 중...</p>
              </div>
            )}

            {formData.connectionStatus === 'success' && (
              <div className="space-y-6">
                {/* Success message */}
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900 dark:text-green-100">
                    연결 테스트 성공
                  </span>
                </div>

                {/* Agent Info Summary - like completion page (UI-LM-CA-005) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">기본 정보</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">에이전트명</span>
                          <span className="text-sm font-medium">{formData.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">IP 주소</span>
                          <span className="text-sm font-medium">{formData.serverIp}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">SSH 포트</span>
                          <span className="text-sm font-medium">{formData.sshPort}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">PATH</span>
                        <span className="text-sm font-medium">{formData.installPaths.length}개</span>
                      </div>
                      <div className="space-y-1">
                        {formData.installPaths.map((path, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            {index + 1}. {path}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PATH Selection for multiple paths */}
                {formData.installPaths.length > 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">PATH 선택</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        여러 개의 PATH가 입력되었습니다. Filebeat 탐지에 사용할 PATH를 선택하세요.
                      </p>
                      <RadioGroup
                        value={formData.selectedFilebeat || formData.installPaths[0]}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, selectedFilebeat: value }))
                        }
                      >
                        <div className="space-y-2">
                          {formData.installPaths.map((path, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <RadioGroupItem value={path} id={`path-${index}`} />
                              <Label htmlFor={`path-${index}`} className="font-normal cursor-pointer">
                                {path}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                )}

                {/* Filebeat Detection Result */}
                {formData.filebeatDetected ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Filebeat 감지 결과</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {formData.filebeatList.length === 1 ? (
                        // Case 1: Single Filebeat - Show in simple format (page 13)
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                설치 경로
                              </span>
                              <span className="text-sm text-blue-800 dark:text-blue-200">
                                {formData.filebeatList[0].path}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                버전
                              </span>
                              <span className="text-sm text-blue-800 dark:text-blue-200">
                                {formData.filebeatList[0].version}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            기존 Filebeat를 사용하여 로그 수집을 설정할 수 있습니다.
                          </p>
                        </div>
                      ) : (
                        // Case 2: Multiple Filebeat - Show in table with radio selection (page 14)
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            여러 개의 Filebeat가 감지되었습니다. 사용할 Filebeat를 선택하세요.
                          </p>
                          <RadioGroup
                            value={formData.selectedFilebeat}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, selectedFilebeat: value }))
                            }
                          >
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-12">선택</TableHead>
                                  <TableHead>설치 경로</TableHead>
                                  <TableHead>버전</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {formData.filebeatList.map((filebeat) => (
                                  <TableRow key={filebeat.path}>
                                    <TableCell>
                                      <RadioGroupItem value={filebeat.path} />
                                    </TableCell>
                                    <TableCell className="font-medium">{filebeat.path}</TableCell>
                                    <TableCell>{filebeat.version}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </RadioGroup>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  // Case 3: No Filebeat detected
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Filebeat 감지 결과</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                        <h4 className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                          Filebeat 미감지
                        </h4>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Filebeat가 설치되지 않았습니다. 수집 대상 등록 시 Filebeat 설치가 필요합니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {formData.connectionStatus === 'failed' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
                  <span className="text-sm font-medium text-red-900 dark:text-red-100">
                    연결 테스트 실패
                  </span>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-md">
                  <h4 className="text-sm font-semibold mb-2">실패 원인</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>SSH 연결 실패: 인증 정보를 확인하세요</li>
                    <li>서버에 접근할 수 없거나 방화벽이 차단되었습니다</li>
                    <li>지정한 경로에 대한 권한이 없습니다</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        // Step 1: Basic info - name, serverIp, and at least one non-empty installPath required
        return (
          formData.name &&
          formData.serverIp &&
          formData.installPaths.length > 0 &&
          formData.installPaths.some((path) => path.trim() !== '')
        );
      case 2:
        // Step 2: Connection test must be success
        return formData.connectionStatus === 'success';
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
            onClick={() => router.push('/collection/agents')}
          >
            취소
          </Button>
          {currentStep === 1 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90"
            >
              연결 테스트
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90"
            >
              <Check className="h-4 w-4 mr-1" />
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
