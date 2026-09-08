# 🛡️ PromptShield AI

> Transform vague ideas into clear, structured and powerful AI prompts.

PromptShield AI is an AI-powered prompt engineering tool that helps users improve their prompts before sending them to an AI model.

## 🚀 What Problem Does It Solve?

Many users know what they want to ask an AI, but their prompts are often too vague or incomplete.

For example:

**Before:**
> teach me python loops

PromptShield analyzes the prompt and transforms it into a structured prompt containing:

- Role
- Primary Goal
- User Request
- Audience / Detail Level
- Instructions
- User Constraints
- Output Format
- Quality Check

This helps users create more precise and useful AI instructions.

## ✨ Key Features

### 📊 Prompt Score
Evaluates the original prompt using four dimensions:

- Clarity
- Context
- Constraints
- Structure

The tool calculates an overall prompt quality score out of 100.

### 🧠 Smart Prompt Optimization
Converts a rough user request into a structured AI-ready prompt.

### ⚡ AI Response Generation
The optimized prompt can be sent directly to Google's Gemini AI to generate a response.

### 📋 Copy Prompt
Users can copy the optimized prompt with one click.

### 🔐 Secure API Key Handling
The Gemini API key is stored as an environment variable and is not included in the public source code.

## 🏗️ Technology Stack

- HTML
- CSS
- JavaScript
- Python
- Flask
- Google Gemini API
- Render
- GitHub

## 🔄 How It Works

```text
User's Rough Prompt
        ↓
Prompt Analysis
        ↓
Prompt Score
        ↓
Prompt Optimization
        ↓
Structured AI Prompt
        ↓
Gemini AI
        ↓
AI Response
