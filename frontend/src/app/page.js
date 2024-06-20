'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";



export default function Home() {
  const url = process.env.BACKEND_URL || "http://127.0.0.1:5000/api/generate";
  const [state, setState] = useState(false);
  const [timer, setTimer] = useState(3);

  function fetchData() {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setState(data)
      })
      .catch(() => setState({"error": true}))
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
      if (timer <= 1) {
        fetchData();
        setTimer(3);
      }
    }, 1200);

    return () => clearInterval(intervalId);
  }, [timer]);

  return (
    <main className={styles.main}>

      <div>
        <Image
          className={styles.logo}
          src="/lfglance.jpg"
          alt="Next.js Logo"
          width={180}
          height={180}
          priority
        />
      </div>

      <div>
        <div style={{paddingBottom: "1em"}}>
          <h1>Sample Microservice Frontend</h1>
          <p style={{padding: 0, margin: 0}}>
            <a href="https://fs10xer.dev/about" target="_blank">by Lance</a>
          </p>
        </div>
        <p>
          This is a simple NextJS app which <br />
          queries an API at <a href={url} target="_blank">{url}</a> <br />
          to fetch dummy data.
        </p>
        <br />
        <p>It's intended to be used as a sample app for <br />testing different services and deployments.</p>
        <div style={{padding: "2em 0"}}>
          <h1>Loading data in {timer}...</h1>
          <br />
          {state && ! state.error &&  (
            <div style={{paddingBottom: "1em"}}>
              <p><strong>Date</strong>: {state.date}</p>
              <p><strong>Host</strong>: {state.host}</p>
              <p><strong>UUID</strong>: {state.uuid}</p>
              <p><strong>Token</strong>: {state.token}</p>
            </div>
          )}
          {state.error && (
            <p><strong>There was an error. Double-check the URL in environment variable config.</strong></p>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://fs10xer.dev"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            fs10xer <span>-&gt;</span>
          </h2>
          <p>my site and blog</p>
        </a>

        <a
          href="https://github.com/lfglance/sample-services-copilot"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Github <span>-&gt;</span>
          </h2>
          <p>source code</p>
        </a>

      </div>
    </main>
  );
}
