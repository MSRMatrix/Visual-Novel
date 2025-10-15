function Save({currentChapter,
  currentScene,
  stepIndex,
  chatHistory,}) {
     
    
    function save() {

    const newSave = {
      name: "",
      timestamp: new Date().toLocaleTimeString(),
      currentChapter: currentChapter,
      currentScene: currentScene,
      stepIndex: stepIndex,
      chatHistory: chatHistory,
    };
    console.log(newSave);
  }

  const placeToSave = [
    { name: "Save 1",
      timestamp: "" ,
      currentChapter: "",
      currentScene: "",
      stepIndex: "",
      chatHistory: "",
    },
{ name: "Save 2",
      timestamp: "" ,
      currentChapter: "",
      currentScene: "",
      stepIndex: "",
      chatHistory: "",
    },
{ name: "Save 3",
      timestamp: "" ,
      currentChapter: "",
      currentScene: "",
      stepIndex: "",
      chatHistory: "",
    },
{ name: "Save 4",
      timestamp: "" ,
      currentChapter: "",
      currentScene: "",
      stepIndex: "",
      chatHistory: "",
    },
{ name: "Save 5",
      timestamp: "" ,
      currentChapter: "",
      currentScene: "",
      stepIndex: "",
      chatHistory: "",
    },

  ]

  return (
    <>
    <button onClick={() => save()}>Test</button>
    {placeToSave.map((item, key) => 
        <div key={key}>
            <h2>{item.name}</h2>
            <p>{item.timestamp}</p>
            <p>{item.currentChapter}</p>
            <p>{item.currentScene}</p>
            <p>{item.stepIndex}</p>
            
        </div>
    )}
    </>
  )
}

export default Save
