import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'; //TypeScript-first schema declaration and validation library. It provides runtime validation for data
import prisma from '@/prisma/client';
import { issueSchema } from '../../validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

// const createIssueSchema = z.object({
//     title: z.string().min(1, 'title is required').max(255),
//     description: z.string().min(1, 'description is required')
// })

export async function POST(reqes: NextRequest) {
    const body = await reqes.json();
    const validation = issueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}