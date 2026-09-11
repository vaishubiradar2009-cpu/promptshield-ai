# 🌉 LifeBridge AI

### From confusing situations to clear actions.

LifeBridge AI is an AI-powered decision-support application that transforms messy real-world situations into a structured, understandable action plan.

Instead of simply generating an answer, LifeBridge follows a four-stage process:

**UNDERSTAND → VERIFY → PRIORITIZE → ACT**

---

## 🚀 What LifeBridge AI Does

A user describes a situation in natural language.

LifeBridge AI then:

1. 🧠 Understands the situation
2. 🔎 Separates supported information from information that needs confirmation
3. 🎯 Determines the level of priority
4. ✅ Generates practical actions
5. ⭐ Identifies the single best next action
6. 💡 Explains why that action was selected

---

## ✨ Key Features

### 🧠 Situation Understanding
Converts a messy user description into a clear summary.

### 🔎 Verification Layer
Separates information into:

- Supported information
- Information that needs confirmation

LifeBridge does not pretend to perform external verification when it has not actually done so.

### 🎯 Priority Engine

Each situation receives a priority level:

- 🟢 Low
- 🟡 Medium
- 🟠 High
- 🔴 Urgent

Priority is based on practical urgency and potential consequences.

### ⚡ Action Bridge

Instead of stopping at an AI-generated explanation, LifeBridge converts the analysis into practical actions.

### ⭐ Next Best Action

LifeBridge identifies the single most useful immediate next step.

### 💡 Why This Action?

The application explains why the recommended next action was selected.

### 📊 Confidence

Confidence represents how confident the AI is that it understood and structured the situation correctly.

---

## 🏗️ Architecture

```text
                    USER
                      │
                      ▼
             ┌─────────────────┐
             │  LifeBridge UI  │
             │ Text + Context  │
             └────────┬────────┘
                      │
                      ▼
               ┌─────────────┐
               │   Gemini AI │
               └──────┬──────┘
                      │
                      ▼
          ┌─────────────────────────┐
          │   LifeBridge Engine     │
          │                         │
          │ Understand              │
          │ Verify                  │
          │ Prioritize              │
          │ Act                     │
          └────────────┬────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   Action Card   │
              │                 │
              │ Priority        │
              │ Summary         │
              │ Facts           │
              │ Verification    │
              │ Actions         │
              │ Next Action     │
              │ Why Action?     │
              └─────────────────┘
