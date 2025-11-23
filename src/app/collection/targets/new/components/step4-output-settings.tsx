'use client';

import { StepProps } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function Step4OutputSettings({ formData, updateFormData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Channel Settings */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">전송 채널 (==Kafka Topic)</Label>
        <RadioGroup
          value={formData.channelMode}
          onValueChange={(value: 'auto' | 'existing') =>
            updateFormData('channelMode', value)
          }
          className="space-y-3"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auto" id="auto-channel" />
              <Label htmlFor="auto-channel" className="font-normal cursor-pointer">
                자동 생성 (권장)
              </Label>
            </div>
            {formData.channelMode === 'auto' && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="newChannelName" className="text-sm">
                  새 채널 이름
                </Label>
                <Input
                  id="newChannelName"
                  placeholder="log_mons_nginx"
                  value={formData.channelName}
                  onChange={(e) => updateFormData('channelName', e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="existing" id="existing-channel" />
              <Label htmlFor="existing-channel" className="font-normal cursor-pointer">
                기존 채널 선택
              </Label>
            </div>
            {formData.channelMode === 'existing' && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="existingChannel" className="text-sm">
                  채널
                </Label>
                <Select
                  value={formData.channelName}
                  onValueChange={(value) => updateFormData('channelName', value)}
                >
                  <SelectTrigger id="existingChannel">
                    <SelectValue placeholder="채널 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nginx-logs">nginx-logs 배포 대기</SelectItem>
                    <SelectItem value="error-logs">error-logs 정상</SelectItem>
                    <SelectItem value="access-logs">access-logs 정상</SelectItem>
                  </SelectContent>
                </Select>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <span className="font-semibold">선택한 채널 정보:</span>
                  </p>
                  <ul className="text-xs text-blue-600 dark:text-blue-400 mt-1 space-y-0.5">
                    <li>• 상태: 배포 대기중</li>
                    <li>• 연결된 수집 대상: 1개 (web-01) - 배포 대기</li>
                  </ul>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    같은 채널을 사용하면 통합 저장됩니다<br />
                    서버 구분을 위해 'host' 필드가 자동 추가됩니다
                  </p>
                </div>
              </div>
            )}
          </div>
        </RadioGroup>
      </div>

      {/* Final Destination */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">최종 저장소 (하나 이상 선택 필수)</Label>
        <Select
          value={formData.outputDestination}
          onValueChange={(value: 'opensearch' | 'database' | 'file') =>
            updateFormData('outputDestination', value)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="opensearch">로그 분석 엔진</SelectItem>
            <SelectItem value="database">데이터 베이스 저장</SelectItem>
            <SelectItem value="file">파일 저장</SelectItem>
          </SelectContent>
        </Select>

        {/* OpenSearch Settings */}
        {formData.outputDestination === 'opensearch' && (
          <div className="p-4 border rounded-lg space-y-3">
            <div className="space-y-2">
              <Label htmlFor="indexPattern" className="text-sm">
                인덱스 패턴
              </Label>
              <Input
                id="indexPattern"
                placeholder="log_mons_nginx"
                value={formData.indexPattern}
                onChange={(e) => updateFormData('indexPattern', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFormat" className="text-sm">
                날짜 포맷
              </Label>
              <Select
                value={formData.dateFormat}
                onValueChange={(value) => updateFormData('dateFormat', value)}
              >
                <SelectTrigger id="dateFormat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  <SelectItem value="YYYY.MM.DD">YYYY.MM.DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Database Settings */}
        {formData.outputDestination === 'database' && (
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">
              메타 DB 용도: 로그 메타정보만 저장 (검색/통계용)<br />
              원본 로그는 OpenSearch 또는 파일에 저장
            </p>
          </div>
        )}

        {/* File Settings */}
        {formData.outputDestination === 'file' && (
          <div className="p-4 border rounded-lg space-y-2">
            <Label htmlFor="filePath" className="text-sm">
              저장 경로
            </Label>
            <Input
              id="filePath"
              placeholder="/var/log/logmons/output"
              value={formData.paths[0] || ''}
              onChange={(e) => {
                const newPaths = [...formData.paths];
                newPaths[0] = e.target.value;
                setFormData((prev) => ({ ...prev, paths: newPaths }));
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
