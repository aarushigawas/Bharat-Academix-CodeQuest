# 🌾 AgriSense AI

AgriSense AI is an AI-powered agricultural advisory platform designed to help farmers make informed decisions regarding crop selection, resource management, and sustainable farming practices. By combining agricultural knowledge with AI-driven recommendations, AgriSense provides personalized insights based on farm conditions such as soil type, water availability, budget, and risk preference.

---

## 🚀 Problem Statement

Farmers often face challenges in selecting the most suitable crops due to varying factors such as soil conditions, irrigation availability, climate uncertainty, and market fluctuations.

Traditional decision-making methods may not always provide personalized recommendations, leading to lower productivity and profitability.

AgriSense AI addresses this challenge by leveraging AI and agricultural knowledge to generate context-aware crop recommendations.

---

## 💡 Solution

AgriSense AI uses a Retrieval-Augmented Generation (RAG) approach to provide personalized crop recommendations.

The system:

1. Collects farm-specific inputs from the user.
2. Retrieves relevant agricultural information from a knowledge base.
3. Uses AI to analyze farm conditions and retrieved context.
4. Generates suitable crop recommendations along with expected yield, profitability, risk assessment, and alternative options.

---

## ✨ Key Features

### 🌱 AI Crop Recommendation Engine
- Personalized crop suggestions
- Alternative crop recommendations
- Expected yield estimation
- Estimated profitability
- Water requirement analysis
- Risk assessment

### 📚 Agricultural Knowledge Base
- Crop cultivation guides
- Agricultural best practices
- Irrigation recommendations
- Soil suitability information
- Sustainable farming references

### 📊 Market Insights
- Agricultural market awareness
- Crop-related insights
- Economic decision support

### 🌾 Sustainable Farming Guidance
- Resource optimization practices
- Environment-friendly farming methods
- Water conservation awareness

### 📖 Farm History & Agricultural Information
- Information about farming practices and agricultural evolution
- Educational agricultural content
- Awareness resources

### 🤖 AI-Powered Recommendations
- Context-aware recommendation generation
- Knowledge-enhanced responses
- Personalized decision support

---

## 🧠 RAG Architecture

AgriSense AI implements a lightweight Retrieval-Augmented Generation (RAG) pipeline.

```text
Farmer Inputs
      ↓
Knowledge Base
(Rabi, Kharif & Agricultural Documents)
      ↓
Document Retrieval
      ↓
Relevant Context Extraction
      ↓
Gemini AI
      ↓
Crop Recommendations
```

### Knowledge Base Sources

The system uses agricultural documents containing:

- Crop cultivation practices
- Soil suitability guidelines
- Irrigation recommendations
- Yield information
- Agricultural best practices

Relevant information is retrieved and injected into the AI prompt to improve recommendation quality.

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### AI & Recommendation Engine
- Google Gemini API
- Retrieval-Augmented Generation (RAG)

### Knowledge Base
- Agricultural Documents (TXT-based knowledge repository)

### Development Tools
- VS Code
- Git & GitHub

---

## 📂 Project Structure

```bash
AgriSense-AI/
│
├── app/
│   ├── about/
│   ├── planner/
│   ├── recommendations/
│   ├── market/
│   ├── history/
│   └── api/
│
├── lib/
│   ├── ai/
│   └── rag/
│
├── public/
│   └── knowledge/
│       ├── rabi.txt
│       ├── kharif.txt
│       └── nmsa.txt
│
└── README.md
```

---

## ⚙️ How It Works

### Step 1 – User Inputs

The farmer provides:

- Location
- Soil Type
- Farm Size
- Water Availability
- Budget
- Risk Preference

### Step 2 – Knowledge Retrieval

The system searches the agricultural knowledge base and retrieves relevant content based on the provided farm conditions.

### Step 3 – AI Analysis

Retrieved agricultural context is combined with user inputs and sent to the AI recommendation engine.

### Step 4 – Recommendation Generation

The system generates:

- Recommended Crop
- Alternative Crops
- Expected Yield
- Estimated Profit
- Water Requirement
- Risk Assessment

---

## 🎯 Future Scope

- Real-time weather integration
- Live market price analysis
- Disease and pest detection
- Multi-language support
- Satellite and IoT integration
- Regional crop prediction models
- Mobile application deployment

---

## 👥 Team

**Team Name:** u24cs014

### Contributors
- Aarushi Gawas
- Vaibhavi Parmar

---

## 📜 License

This project was developed as part of an academic innovation challenge and is intended for educational and research purposes.

---

## 🌾 AgriSense AI

**Empowering Farmers Through AI-Driven Agricultural Intelligence**