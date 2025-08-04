import { NextResponse } from 'next/server';

export async function POST(req) {
  const { messages } = await req.json();
  
  try {
    // Validate input
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format');
    }

    // Prepare messages for OpenRouter
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    // Add system prompt at the beginning
    formattedMessages.unshift({
      role: "system",
      content: `You are an expert AI tutor for DeepLearn Points. Provide comprehensive, structured explanations with:
1. A relatable analogy to start
2. Clear definition with key terms
3. 3-5 key components breakdown
4. Nigerian context example
5. Visual representation suggestion
6. Learning resources recommendation
7. Follow-up question to engage student

Always be encouraging and patient. If a student struggles, offer alternative explanations.`
    });

    // Required headers for OpenRouter
    const headers = {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000', // Update with your domain
      'X-Title': 'DeepLearn Points'
    };

    // API payload with CORRECT model ID
    const payload = {
      // CORRECTED MODEL ID
      model: "deepseek/deepseek-r1:free ",
      messages: formattedMessages,
      max_tokens: 2000,
      temperature: 0.7
    };

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    // Handle non-200 responses
    if (!openRouterResponse.ok) {
      const errorData = await openRouterResponse.json();
      console.error('OpenRouter API error:', {
        status: openRouterResponse.status,
        error: errorData.error || openRouterResponse.statusText
      });
      
      throw new Error(
        `API error: ${errorData.error?.message || openRouterResponse.statusText}`
      );
    }

    const data = await openRouterResponse.json();

    // Validate response
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response from AI model');
    }

    const aiResponse = data.choices[0].message.content;

    // Calculate points (1 point per 50 characters, max 10)
    const contentLength = aiResponse.length;
    const pointsEarned = Math.min(Math.floor(contentLength / 50), 10);

    // Extract resources
    const resources = extractResources(aiResponse);

    return NextResponse.json({
      response: aiResponse,
      pointsEarned,
      resources
    });
    
  } catch (error) {
    console.error('AI Tutor Error:', error.message);
    return NextResponse.json(
      { 
        error: "I'm having trouble with that request. Please try again later.",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Helper to extract learning resources
function extractResources(content) {
  try {
    // Look for resource section
    const resourceSection = content.match(
      /(?:Recommended resources:|Resources:|Learning resources:)\s*([\s\S]+?)(?=\n\n|$)/i
    );
    
    if (resourceSection && resourceSection[1]) {
      return resourceSection[1]
        .split('\n')
        .map(line => line.replace(/^[\s•\-*]+/, '').trim())
        .filter(line => line.length > 0);
    }
    
    // Fallback to default resources
    return [
      "DeepSeek Documentation: https://platform.deepseek.com",
      "Khan Academy Statistics: https://www.khanacademy.org/math/statistics-probability",
      "Towards Data Science: https://towardsdatascience.com"
    ];
  } catch {
    return [
      "DeepSeek Documentation: https://platform.deepseek.com",
      "Khan Academy Statistics: https://www.khanacademy.org/math/statistics-probability"
    ];
  }
}