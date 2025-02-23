import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl font-bold">Fake Note Detector</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to Fake Note Detector</h2>
          <p className="mb-4">
            Our Fake Note Detector app is designed to help you identify counterfeit currency notes quickly and
            accurately. By leveraging advanced image processing and machine learning techniques, we provide a reliable
            solution to protect individuals and businesses from financial fraud.
          </p>
          <p className="mb-4">
            Simply upload an image of a currency note, and our system will analyze it for various security features and
            patterns to determine its authenticity. Our app supports multiple currencies and is constantly updated to
            detect the latest counterfeiting techniques.
          </p>
          <p className="mb-4">
            Protect yourself and your business from the risks of counterfeit money. Try our Fake Note Detector today!
          </p>
        </section>
        <Link href="/detect" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
          Start Detecting
        </Link>
        <footer className="mt-12 text-sm text-gray-600">
          <p>This project was made at DUHacks Hackathon by team JETS.</p>
        </footer>
      </main>
    </div>
  )
}

