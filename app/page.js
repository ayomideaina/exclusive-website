export default function Home() {
  return (
    <main className="min-h-screen bg-primary flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold text-primary">
          Welcome to Exclusive
        </h1>

        <button className="mt-8 rounded-md bg-primary px-6 py-3 text-white hover:bg-primary-dark transition-colors">
          Get Started
        </button>
      </div>
    </main>
  );
}
