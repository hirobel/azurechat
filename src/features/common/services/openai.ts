import { OpenAI } from "openai";

export const OpenAIInstance = () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: `https://api.openai.com`,
    defaultQuery: { "api-version": process.env.OPENAI_API_VERSION },
    defaultHeaders: { "api-key": process.env.OPENAI_API_KEY },
  });
  return openai;
};

export const OpenAIEmbeddingInstance = () => {
  if (
    !process.env.OPENAI_API_KEY ||
    !process.env.OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME ||
    !process.env.OPENAI_API_INSTANCE_NAME
  ) {
    throw new Error(
      "Azure OpenAI Embeddings endpoint config is not set, check environment variables."
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: `https://api.openai.com`,
    defaultQuery: { "api-version": process.env.OPENAI_API_VERSION },
    defaultHeaders: { "api-key": process.env.OPENAI_API_KEY },
  });
  return openai;
};

// a new instance definition for DALL-E image generation
export const OpenAIDALLEInstance = () => {
  if (
    !process.env.OPENAI_DALLE_API_KEY ||
    !process.env.OPENAI_DALLE_API_DEPLOYMENT_NAME ||
    !process.env.OPENAI_DALLE_API_INSTANCE_NAME
  ) {
    throw new Error(
      "Azure OpenAI DALLE endpoint config is not set, check environment variables."
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_DALLE_API_KEY,
    baseURL: `https://api.openai.com`,
    defaultQuery: {
      "api-version":
        process.env.OPENAI_DALLE_API_VERSION || "2023-12-01-preview",
    },
    defaultHeaders: {
      "api-key": process.env.OPENAI_DALLE_API_KEY,
    },
  });
  return openai;
};

export const OpenAIVisionInstance = () => {
  if (
    !process.env.OPENAI_VISION_API_KEY ||
    !process.env.OPENAI_VISION_API_DEPLOYMENT_NAME ||
    !process.env.OPENAI_VISION_API_INSTANCE_NAME ||
    !process.env.OPENAI_VISION_API_VERSION
  ) {
    throw new Error(
      "Azure OpenAI Vision environment config is not set, check environment variables."
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_VISION_API_KEY,
    baseURL: `https://api.openai.com`,
    defaultQuery: {
      "api-version": process.env.OPENAI_VISION_API_VERSION,
    },
    defaultHeaders: { "api-key": process.env.OPENAI_VISION_API_KEY },
  });
  return openai;
};
