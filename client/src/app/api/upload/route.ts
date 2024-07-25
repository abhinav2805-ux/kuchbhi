import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import path, { parse } from "path";
import { writeFile } from "fs/promises";
import { NextApiRequest } from 'next';

// Disable automatic body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};



// GET method handler
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      status: 200,
      result: "hello"
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { message: "Internal Server Error" }
    });
  }
}

// POST method handler
export async function POST(req: NextRequest) {
  try {
    const Data=await req.formData();
    // const {fields,files}=await parseForm(req);
    // const file=files.image;
    const file: File | null=Data.get('image') as unknown as File;

    // const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty." }, { status: 400 });
    }
  
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename =  file.name.replaceAll(" ", "_");
    const filepath = path.join(process.cwd(), `public/files/${filename}`);
    await writeFile(filepath,buffer)
    console.log(filename)
    const form = new FormData();
    form.append('file',fs.createReadStream(filepath),filename);
    
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: JSON.stringify({path:filepath}),
        headers: {
          'Content-Type': 'application/json',
          }
      });

      if (!response.ok) {
        return NextResponse.json({ message: 'Error making prediction', error: response.statusText }, { status: response.status });
      }

      const rst:any = await response.json();
      console.log(rst)
      return NextResponse.json({
        status: 200,
        data: rst.work
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        status: 500,
        body: { message: "Internal Server Error" }
      });
    }
    

    

    return NextResponse.json({
      status:200,
      body:"hello"
    })
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { message: "Internal Server Error" }
    });
  }
}

export const dynamic = "force-static";
