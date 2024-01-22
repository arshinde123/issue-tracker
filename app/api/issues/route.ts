import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";
import OpenAI from "openai";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    // model: "babbage-002",
    // model: "davinci-002",
    // messages: [
    //   {
    //     role: "user",
    //     content:
    //       "Write summary for 6 year experienced frontend engineer for resume",
    //   },
    // ],
    prompt: body.prompt,
    temperature: 1,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response.choices[0].text);
}
