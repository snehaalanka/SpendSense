import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { Mic, Square } from "lucide-react";

import { transcribeAudio, extractExpense } from "../../api/aiApi";
import { addExpense } from "../../api/expenseApi";

import ExpenseResult from "./ExpenseResult";

const VoiceExpense = () => {

  const token = localStorage.getItem("token");

  const [recording, setRecording] = useState(false);

  const [transcript, setTranscript] = useState("");

  const [processing, setProcessing] = useState(false);

  const [result, setResult] = useState(null);

  const [saving, setSaving] = useState(false);

  const mediaRecorderRef = useRef(null);

  const chunksRef = useRef([]);


  const startRecording = async () => {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);

      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        handleRecordingComplete();
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();

      mediaRecorderRef.current = recorder;

      setRecording(true);

    } catch (err) {
      console.log(err);
      toast.error("Microphone access denied.");
    }

  };


  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };


  const handleRecordingComplete = async () => {

    try {

      setProcessing(true);

      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });

      const transcribeData = await transcribeAudio(audioBlob, token);

      setTranscript(transcribeData.text);

      const extractData = await extractExpense(transcribeData.text, token);

      setResult(extractData);

    } catch (err) {
      console.log(err);
      toast.error("Failed to process recording.");
    } finally {
      setProcessing(false);
    }

  };


  const handleSave = async () => {
  try {
    setSaving(true);

    const response = await addExpense(result, token);

    // Intercept backend budget checks
    if (response && response.budgetWarning) {
      toast.warning(response.warningMessage);
    }

    toast.success("Expense added successfully.");
    setTranscript("");
    setResult(null);

  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Failed to save expense.");
  } finally {
    setSaving(false);
  }
};


  return (
    <div className="expense-card">

      <div className="voice-container">

        <div className="mic-circle">
          <Mic size={52} />
        </div>

        <h2>Voice Expense Entry</h2>

        <p className="voice-description">
          Click the microphone button and describe your expense naturally.
        </p>

        <div className="voice-actions">

          {!recording ? (

            <button
              className="voice-btn"
              onClick={startRecording}
              disabled={processing}
            >
              <Mic size={18} />
              Start Recording
            </button>

          ) : (

            <button
              className="voice-btn"
              onClick={stopRecording}
            >
              <Square size={18} />
              Stop Recording
            </button>

          )}

          <textarea
            placeholder="🎤 Your voice transcript will appear here..."
            rows="6"
            value={processing ? "Transcribing..." : transcript}
            readOnly
          />

        </div>

      </div>

      <ExpenseResult
        result={result}
        onSave={handleSave}
        saving={saving}
      />

    </div>
  );
};

export default VoiceExpense;