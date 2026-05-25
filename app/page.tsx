import Navbar from "./_components/navbar/navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      {/* Hero */}
      <section id="home" className="">
        <h1>Introducing Messaging — Now with AI</h1>
        <h1>
          Messaging with <span>AI</span>built right in
        </h1>
        <p>
          The modern messaging platform where conversations are smarter, calls
          are clearer, and your AI assistant is always one tap away. Trusted by
          2M+ professionals.
        </p>
      </section>
      <section id="why">Why Section</section>
    </div>
  );
}
