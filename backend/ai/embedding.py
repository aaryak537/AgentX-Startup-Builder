"""
=========================================================
AgentX Startup Builder
AI Embeddings Module
=========================================================

Purpose:
- Generate embeddings for text (future use)
- Calculate semantic similarity
- Support Retrieval-Augmented Generation (RAG)
- Recommend similar startups
- Keep architecture scalable

Current Version:
- Lightweight implementation for hackathon
- Easily replaceable with OpenAI/OpenRouter embeddings later
"""

from typing import List
import math


class EmbeddingEngine:
    """
    Handles text embeddings and similarity search.

    This version is intentionally lightweight.
    Future versions can integrate:
        - OpenAI Embeddings
        - OpenRouter Embeddings
        - SentenceTransformers
        - FAISS
        - ChromaDB
    """

    def __init__(self):
        self.dimension = 256

    # --------------------------------------------------
    # Generate Embedding (Placeholder)
    # --------------------------------------------------
    def generate_embedding(self, text: str) -> List[float]:
        """
        Generates a deterministic pseudo-embedding.

        Replace this later with a real embedding API.

        Returns:
            List[float]
        """

        text = text.lower().strip()

        vector = [0.0] * self.dimension

        for index, char in enumerate(text):
            vector[index % self.dimension] += (ord(char) % 97) / 97.0

        return vector

    # --------------------------------------------------
    # Cosine Similarity
    # --------------------------------------------------
    def cosine_similarity(
        self,
        vector1: List[float],
        vector2: List[float]
    ) -> float:

        dot = sum(a * b for a, b in zip(vector1, vector2))

        mag1 = math.sqrt(sum(a * a for a in vector1))
        mag2 = math.sqrt(sum(b * b for b in vector2))

        if mag1 == 0 or mag2 == 0:
            return 0.0

        return dot / (mag1 * mag2)

    # --------------------------------------------------
    # Text Similarity
    # --------------------------------------------------
    def text_similarity(self, text1: str, text2: str) -> float:

        emb1 = self.generate_embedding(text1)
        emb2 = self.generate_embedding(text2)

        return self.cosine_similarity(emb1, emb2)

    # --------------------------------------------------
    # Find Most Similar Startup
    # --------------------------------------------------
    def find_best_match(
        self,
        query: str,
        documents: List[str]
    ):

        if not documents:
            return None

        best_document = None
        best_score = -1

        for doc in documents:

            score = self.text_similarity(query, doc)

            if score > best_score:
                best_score = score
                best_document = doc

        return {
            "document": best_document,
            "score": round(best_score, 4)
        }


# Singleton instance
embedding_engine = EmbeddingEngine()