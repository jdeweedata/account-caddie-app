import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PIScoreDisplayProps {
  score: number
}

export function PIScoreDisplay({ score }: PIScoreDisplayProps) {
  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: 'High Complexity', color: 'text-red-500' }
    if (score >= 50) return { label: 'Medium Complexity', color: 'text-yellow-500' }
    return { label: 'Low Complexity', color: 'text-green-500' }
  }

  const category = getScoreCategory(score)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Business Complexity Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{score}/100</span>
          <span className={`font-medium ${category.color}`}>
            {category.label}
          </span>
        </div>
        <Progress value={score} className="h-2" />
        <p className="text-sm text-gray-600 mt-4">
          This score reflects the complexity of your business needs based on your assessment responses.
          Our consultation will be tailored to address your specific requirements.
        </p>
      </CardContent>
    </Card>
  )
} 