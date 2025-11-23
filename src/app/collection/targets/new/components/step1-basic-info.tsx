'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Agent, StepProps } from './types';
import { useSearchParams } from 'next/navigation';

interface Step1Props extends StepProps {
  agents: Agent[];
}

export function Step1BasicInfo({ formData, updateFormData, agents }: Step1Props) {
  const searchParams = useSearchParams();
  const isAgentPreSelected = searchParams.get('agent') !== null;
  const selectedAgent = agents.find((a) => a.id === formData.agentId);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="agentId">에이전트 *</Label>
        {isAgentPreSelected && selectedAgent ? (
          <Input
            id="agentId"
            value={`${selectedAgent.name} (${selectedAgent.server_ip})`}
            disabled
            className="bg-muted"
          />
        ) : (
          <Select
            value={formData.agentId}
            onValueChange={(value) => updateFormData('agentId', value)}
          >
            <SelectTrigger id="agentId">
              <SelectValue placeholder="에이전트 선택" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name} ({agent.server_ip})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

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
}
