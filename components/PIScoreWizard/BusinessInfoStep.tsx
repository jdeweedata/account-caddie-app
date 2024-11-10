import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from 'react';

export interface BusinessAnalysisData {
  businessName: string;
  industry: string;
  employeeCount: string;
  annualRevenue: string;
  businessChallenges: string[];
}

interface BusinessInfoStepProps {
  businessData: BusinessAnalysisData;
  setBusinessData: (data: BusinessAnalysisData) => void;
}

export function BusinessInfoStep({ 
  businessData, 
  setBusinessData 
}: BusinessInfoStepProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBusinessData({
      ...businessData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setBusinessData({
      ...businessData,
      [name]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          name="businessName"
          value={businessData.businessName}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select
          value={businessData.industry}
          onValueChange={(value) => handleSelectChange('industry', value)}
        >
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="services">Professional Services</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="employeeCount">Number of Employees</Label>
        <Select
          value={businessData.employeeCount}
          onValueChange={(value) => handleSelectChange('employeeCount', value)}
        >
          <SelectTrigger id="employeeCount">
            <SelectValue placeholder="Select employee count" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10</SelectItem>
            <SelectItem value="11-50">11-50</SelectItem>
            <SelectItem value="51-200">51-200</SelectItem>
            <SelectItem value="201+">201+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="annualRevenue">Annual Revenue</Label>
        <Select
          value={businessData.annualRevenue}
          onValueChange={(value) => handleSelectChange('annualRevenue', value)}
        >
          <SelectTrigger id="annualRevenue">
            <SelectValue placeholder="Select annual revenue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<1M">Less than R1M</SelectItem>
            <SelectItem value="1M-5M">R1M - R5M</SelectItem>
            <SelectItem value="5M-20M">R5M - R20M</SelectItem>
            <SelectItem value="20M+">R20M+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessChallenges">Business Challenges</Label>
        <Textarea
          id="businessChallenges"
          name="businessChallenges"
          value={businessData.businessChallenges.join(', ')}
          onChange={(e) => setBusinessData({
            ...businessData,
            businessChallenges: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
          })}
          placeholder="Enter your business challenges, separated by commas"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
} 