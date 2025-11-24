'use client';

import { StepProps } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Plus, Trash2, ChevronDown } from 'lucide-react';

export function Step2DetailSettings({ formData, updateFormData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Input Type Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">수집대상 유형</Label>
        <RadioGroup
          value={formData.inputType}
          onValueChange={(value: 'file' | 'syslog' | 'tcp-udp') =>
            updateFormData('inputType', value)
          }
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="file" id="file" />
            <Label htmlFor="file" className="font-normal cursor-pointer">
              파일 로그
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="syslog" id="syslog" />
            <Label htmlFor="syslog" className="font-normal cursor-pointer">
              Syslog
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tcp-udp" id="tcp-udp" />
            <Label htmlFor="tcp-udp" className="font-normal cursor-pointer">
              네트워크 스트림(TCP/UDP)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* File Log Settings */}
      {formData.inputType === 'file' && (
        <>
          <div className="space-y-2">
            <Label className="text-sm font-medium">수집 경로 (필수)</Label>
            {formData.paths.map((path, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="/var/log/application.log"
                  value={path}
                  onChange={(e) => {
                    const newPaths = [...formData.paths];
                    newPaths[index] = e.target.value;
                    setFormData((prev) => ({ ...prev, paths: newPaths }));
                  }}
                />
                {formData.paths.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newPaths = formData.paths.filter((_, i) => i !== index);
                      setFormData((prev) => ({ ...prev, paths: newPaths }));
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setFormData((prev) => ({ ...prev, paths: [...prev.paths, ''] }));
              }}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              경로 추가
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="encoding">인코딩 (선택)</Label>
            <Select
              value={formData.encoding}
              onValueChange={(value) => updateFormData('encoding', value)}
            >
              <SelectTrigger id="encoding">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTF-8">UTF-8</SelectItem>
                <SelectItem value="EUC-KR">EUC-KR</SelectItem>
                <SelectItem value="iso-8859-1">iso-8859-1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="multiline"
                checked={formData.enableMultiline}
                onCheckedChange={(checked) =>
                  updateFormData('enableMultiline', checked as boolean)
                }
              />
              <Label htmlFor="multiline" className="font-normal cursor-pointer">
                멀티 라인 활성화 (선택)
              </Label>
            </div>
            {formData.enableMultiline && (
              <div className="ml-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="multilinePattern" className="text-sm font-medium">
                    패턴 (필수)
                  </Label>
                  <Input
                    id="multilinePattern"
                    placeholder="정규표현식 패턴 입력"
                    value={formData.multilinePattern}
                    onChange={(e) =>
                      updateFormData('multilinePattern', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">패턴 반전 (negate) (필수)</Label>
                  <RadioGroup
                    value={formData.multilineNegate}
                    onValueChange={(value: 'true' | 'false') =>
                      updateFormData('multilineNegate', value)
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="true" id="negate-true" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="negate-true" className="font-normal cursor-pointer">
                          true (매칭되지 않으면 연결 / 일반적)
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="false" id="negate-false" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="negate-false" className="font-normal cursor-pointer">
                          false (매칭되면 연결)
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">매칭 방향 (match) (필수)</Label>
                  <RadioGroup
                    value={formData.multilineMatch}
                    onValueChange={(value: 'after' | 'before') =>
                      updateFormData('multilineMatch', value)
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="after" id="match-after" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="match-after" className="font-normal cursor-pointer">
                          after (패턴 줄 뒤에 연결 / 권장)
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="before" id="match-before" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="match-before" className="font-normal cursor-pointer">
                          before (패턴 줄 앞에 연결)
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Syslog Settings */}
      {formData.inputType === 'syslog' && (
        <>
          <div className="space-y-2">
            <Label className="text-sm font-medium">포맷 (선택, 디폴트 자동)</Label>
            <RadioGroup
              value={formData.syslogFormat}
              onValueChange={(value: 'auto' | 'rfc3164' | 'rfc5424') =>
                updateFormData('syslogFormat', value)
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auto" id="auto" />
                <Label htmlFor="auto" className="font-normal cursor-pointer">
                  자동 감지 (권장)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rfc3164" id="rfc3164" />
                <Label htmlFor="rfc3164" className="font-normal cursor-pointer">
                  BSD Syslog (rfc3164)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rfc5424" id="rfc5424" />
                <Label htmlFor="rfc5424" className="font-normal cursor-pointer">
                  새로운 Syslog 표준 (rfc5424)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">프로토콜 (필수)</Label>
            <RadioGroup
              value={formData.protocol}
              onValueChange={(value: 'tcp' | 'udp') =>
                updateFormData('protocol', value)
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tcp" id="tcp" />
                <Label htmlFor="tcp" className="font-normal cursor-pointer">
                  TCP
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="udp" id="udp" />
                <Label htmlFor="udp" className="font-normal cursor-pointer">
                  UDP
                </Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-muted-foreground mt-1">
              UDP 기본 10KiB, TCP 기본 20MiB
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxMessageSize" className="text-sm font-medium">
              최대 메시지 크기 (선택, 디폴트 {formData.protocol === 'udp' ? '10 KiB' : '20 MiB'})
            </Label>
            <div className="flex gap-2 items-end max-w-xs">
              <div className="w-24">
                <Input
                  id="maxMessageSize"
                  type="number"
                  placeholder={formData.protocol === 'udp' ? '10' : '20'}
                  value={formData.maxMessageSize}
                  onChange={(e) => updateFormData('maxMessageSize', e.target.value)}
                />
              </div>
              <div className="w-20">
                <Select
                  value={formData.protocol === 'udp' ? 'KiB' : 'MiB'}
                  disabled
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KiB">KiB</SelectItem>
                    <SelectItem value="MiB">MiB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {formData.protocol === 'udp'
                ? 'UDP: 최대 메시지 크기는 KiB 단위로 설정됩니다'
                : 'TCP: 최대 메시지 크기는 MiB 단위로 설정됩니다'}
            </p>
          </div>

          {/* TCP Options - Collapsible */}
          {formData.protocol === 'tcp' && (
            <Collapsible className="space-y-2">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full justify-between p-4 hover:bg-muted/50"
                >
                  <span className="text-sm font-semibold">고급 옵션 (TCP)</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">프레이밍 (framing)</Label>
                  <RadioGroup
                    value={formData.tcpFraming}
                    onValueChange={(value: 'delimiter' | 'rfc6587') =>
                      updateFormData('tcpFraming', value)
                    }
                    className="space-y-2"
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="delimiter" id="delimiter" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="delimiter" className="font-normal cursor-pointer">
                          delimiter (구분자)
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          각 메시지를 구분자로 분리
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="rfc6587" id="rfc6587" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="rfc6587" className="font-normal cursor-pointer">
                          rfc6587 (길이 기반)
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          메시지 앞에 길이 정보 포함 (예: "123 &lt;message&gt;")
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.tcpFraming === 'delimiter' && (
                  <div className="space-y-2">
                    <Label htmlFor="tcpDelimiter" className="text-sm font-medium">
                      구분자 (delimiter)
                    </Label>
                    <Input
                      id="tcpDelimiter"
                      placeholder="\n"
                      value={formData.tcpDelimiter}
                      onChange={(e) => updateFormData('tcpDelimiter', e.target.value)}
                      className="max-w-xs"
                    />
                    <p className="text-xs text-muted-foreground">
                      메시지를 구분하는 문자 (예: \n, \r\n, |)
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="tcpTimeout" className="text-sm font-medium">
                    타임아웃 (초) (선택, 디폴트 300초)
                  </Label>
                  <Input
                    id="tcpTimeout"
                    type="number"
                    placeholder="300"
                    value={formData.tcpTimeout}
                    onChange={(e) => updateFormData('tcpTimeout', e.target.value)}
                    className="max-w-xs"
                  />
                  <p className="text-xs text-muted-foreground">
                    비활성 연결이 유지되는 최대 시간 (초)
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-medium">수신 주소 (필수)</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="listenIp" className="text-xs text-muted-foreground">
                  IP
                </Label>
                <Input
                  id="listenIp"
                  placeholder="0.0.0.0"
                  value={formData.listenIp}
                  onChange={(e) => updateFormData('listenIp', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="listenPort" className="text-xs text-muted-foreground">
                  PORT
                </Label>
                <Input
                  id="listenPort"
                  placeholder="514"
                  value={formData.listenPort}
                  onChange={(e) => updateFormData('listenPort', e.target.value)}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* TCP/UDP Network Stream Settings */}
      {formData.inputType === 'tcp-udp' && (
        <>
          {/* Protocol Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">프로토콜 (필수)</Label>
            <RadioGroup
              value={formData.protocol}
              onValueChange={(value: 'tcp' | 'udp') =>
                updateFormData('protocol', value)
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tcp" id="tcp-proto" />
                <Label htmlFor="tcp-proto" className="font-normal cursor-pointer">
                  TCP
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="udp" id="udp-proto" />
                <Label htmlFor="udp-proto" className="font-normal cursor-pointer">
                  UDP
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Max Message Size */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              최대 메시지 크기 (선택, 디폴트 제공)
            </Label>
            <div className="flex gap-2 items-end max-w-xs">
              <div className="w-24">
                <Input
                  type="number"
                  id="maxMessageSize2"
                  placeholder={formData.protocol === 'udp' ? '10' : '20'}
                  value={formData.maxMessageSize}
                  onChange={(e) => updateFormData('maxMessageSize', e.target.value)}
                />
              </div>
              <div className="w-20">
                <Select
                  value={formData.protocol === 'udp' ? 'KiB' : 'MiB'}
                  disabled
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KiB">KiB</SelectItem>
                    <SelectItem value="MiB">MiB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {formData.protocol === 'tcp'
                ? '20 MiB (TCP) 또는 10 KiB (UDP)'
                : '20 MiB (TCP) 또는 10 KiB (UDP)'}
            </p>
          </div>

          {/* TCP Options - Collapsible */}
          {formData.protocol === 'tcp' && (
            <Collapsible className="space-y-2">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full justify-between p-4 hover:bg-muted/50"
                >
                  <span className="text-sm font-semibold">고급 옵션 (TCP)</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 p-4 border rounded-lg bg-muted/50">
                {/* Framing */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">프레이밍 (framing)</Label>
                  <RadioGroup
                    value={formData.tcpFraming}
                    onValueChange={(value: 'delimiter' | 'rfc6587') =>
                      updateFormData('tcpFraming', value)
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="delimiter" id="framing-delimiter" />
                      <div className="space-y-1">
                        <Label htmlFor="framing-delimiter" className="font-normal cursor-pointer">
                          delimiter (구분자)
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          각 메시지를 구분자로 분리
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="rfc6587" id="framing-rfc6587" />
                      <div className="space-y-1">
                        <Label htmlFor="framing-rfc6587" className="font-normal cursor-pointer">
                          rfc6587 (길이 기반)
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          메시지 앞에 길이 정보 포함
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Delimiter */}
                {formData.tcpFraming === 'delimiter' && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">구분자 (delimiter)</Label>
                    <Input
                      id="tcpDelimiter2"
                      placeholder="\n"
                      className="max-w-xs"
                      value={formData.tcpDelimiter}
                      onChange={(e) => updateFormData('tcpDelimiter', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      메시지를 구분하는 문자 (예: \n, \r\n, |)
                    </p>
                  </div>
                )}

                {/* Max Connections */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">최대 연결 수 (0 = 무제한)</Label>
                  <Input
                    type="number"
                    id="maxConnections"
                    placeholder="0"
                    className="max-w-xs"
                    value={formData.maxConnections || '0'}
                    onChange={(e) => updateFormData('maxConnections', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    동시 연결 가능한 최대 클라이언트 수 (0 = 무제한)
                  </p>
                </div>

                {/* Timeout */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">타임아웃 (초)</Label>
                  <Input
                    type="number"
                    id="tcpTimeout2"
                    placeholder="300"
                    className="max-w-xs"
                    value={formData.tcpTimeout}
                    onChange={(e) => updateFormData('tcpTimeout', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    비활성 연결이 유지되는 최대 시간 (초)
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* UDP Options - Collapsible */}
          {formData.protocol === 'udp' && (
            <Collapsible className="space-y-2">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full justify-between p-4 hover:bg-muted/50"
                >
                  <span className="text-sm font-semibold">고급 옵션 (UDP)</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 p-4 border rounded-lg bg-muted/50">
                {/* Read Buffer */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">읽기 버퍼 (bytes)</Label>
                  <Input
                    type="number"
                    id="udpReadBuffer"
                    placeholder="65536"
                    className="max-w-xs"
                    value={formData.udpReadBuffer || '65536'}
                    onChange={(e) => updateFormData('udpReadBuffer', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    UDP 소켓의 읽기 버퍼 크기 (bytes)
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Listen Address */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">수신 주소 (필수)</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="listenIp2" className="text-xs text-muted-foreground">
                  IP
                </Label>
                <Input
                  id="listenIp2"
                  placeholder="0.0.0.0"
                  value={formData.listenIp}
                  onChange={(e) => updateFormData('listenIp', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="listenPort2" className="text-xs text-muted-foreground">
                  PORT
                </Label>
                <Input
                  id="listenPort2"
                  placeholder="514"
                  value={formData.listenPort}
                  onChange={(e) => updateFormData('listenPort', e.target.value)}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom Fields - Common for all types */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">커스텀 필드 (선택)</Label>
        {formData.customFields.map((field, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Field name"
              value={field.name}
              onChange={(e) => {
                const newFields = [...formData.customFields];
                newFields[index].name = e.target.value;
                setFormData((prev) => ({ ...prev, customFields: newFields }));
              }}
            />
            <Input
              placeholder="Field value"
              value={field.value}
              onChange={(e) => {
                const newFields = [...formData.customFields];
                newFields[index].value = e.target.value;
                setFormData((prev) => ({ ...prev, customFields: newFields }));
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                const newFields = formData.customFields.filter((_, i) => i !== index);
                setFormData((prev) => ({ ...prev, customFields: newFields }));
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              customFields: [...prev.customFields, { name: '', value: '' }]
            }));
          }}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-1" />
          필드 추가
        </Button>
      </div>
    </div>
  );
}
