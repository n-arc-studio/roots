import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export class AIService {
  /**
   * Ask AI about family history
   */
  async askQuestion(question: string, context?: string): Promise<string> {
    try {
      const systemPrompt = `あなたは家族史と系譜の専門家です。
ユーザーの家族に関する質問に、温かく、敬意を持って答えてください。
${context ? `\n家族の背景情報:\n${context}` : ''}`

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })

      return response.choices[0].message.content || '申し訳ございません。回答を生成できませんでした。'
    } catch (error) {
      console.error('AI askQuestion error:', error)
      throw new Error('AI質問処理に失敗しました')
    }
  }

  /**
   * Generate family history summary
   */
  async generateSummary(familyData: any): Promise<string> {
    try {
      const prompt = `以下の家族データから、感動的で詳細な家族史の要約を生成してください：

${JSON.stringify(familyData, null, 2)}

要約には以下を含めてください：
1. 家族の起源と歴史的背景
2. 主要な出来事とマイルストーン
3. 世代を超えた特徴や伝統
4. 将来の世代へのメッセージ`

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'あなたは家族史の物語を紡ぐ専門の作家です。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      })

      return response.choices[0].message.content || '要約を生成できませんでした。'
    } catch (error) {
      console.error('AI generateSummary error:', error)
      throw new Error('要約生成に失敗しました')
    }
  }

  /**
   * Organize and categorize memories
   */
  async organizeMemories(memories: any[]): Promise<any> {
    try {
      const prompt = `以下の思い出を分析し、テーマ、時代、重要度で整理してください：

${JSON.stringify(memories, null, 2)}

JSON形式で以下の構造を返してください：
{
  "themes": ["テーマ1", "テーマ2", ...],
  "timeline": [{"period": "時代", "memories": [...]}],
  "highlights": ["重要な思い出のID"]
}`

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'JSONのみを返してください。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1500,
        response_format: { type: 'json_object' }
      })

      const content = response.choices[0].message.content
      return content ? JSON.parse(content) : null
    } catch (error) {
      console.error('AI organizeMemories error:', error)
      throw new Error('思い出の整理に失敗しました')
    }
  }

  /**
   * Generate biography from person data
   */
  async generateBiography(personData: any): Promise<string> {
    try {
      const prompt = `以下の人物データから、敬意を込めた伝記を生成してください：

${JSON.stringify(personData, null, 2)}`

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'あなたは伝記作家です。人物の人生を尊重し、感動的に描写してください。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      })

      return response.choices[0].message.content || '伝記を生成できませんでした。'
    } catch (error) {
      console.error('AI generateBiography error:', error)
      throw new Error('伝記生成に失敗しました')
    }
  }
}

export default new AIService()
