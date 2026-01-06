interface PageProps {
  params: {
    id: string
  }
}

export default function DeckPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Deck {params.id}</h1>
        <p className="text-lg mb-8">
          This is a placeholder page for viewing/editing deck {params.id}. Functionality to be implemented.
        </p>
        <a
          href="/"
          className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
