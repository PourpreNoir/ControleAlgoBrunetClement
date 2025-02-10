function assignStagesOptimized(artists, stages) {
    // Créer une map pour associer chaque genre à une scène
    const genreToStage = new Map();
    
    for (const stage of stages) {
      for (const genre of stage.genres) {
        genreToStage.set(genre, stage.id);
      }
    }
  
    // Assigner directement la scène à chaque artiste
    for (const artist of artists) {
      artist.stage = genreToStage.get(artist.genre) || null; // Null si aucune scène ne correspond
    }
  }
  function assignStages(artists, stages) {
    for (let stage of stages) {
      for (let artist of artists) {
        if (stage.genres.includes(artist.genre)) {
          artist.stage = stage.id;
          break;
        }
      }
    }
  }

  const artists = [
    { id: "1", name: "Adele", genre: "Pop", stage: "" },
    { id: "2", name: "Metallica", genre: "Metal", stage: "" },
    { id: "3", name: "Eminem", genre: "Rap", stage: "" },
    
  ];
  
  const stages = [
    { id: "A", name: "Pop Stage", genres: ["Pop"] },
    { id: "B", name: "Rap Stage", genres: ["Rap"] },
    { id: "C", name: "Rock Stage", genres: ["Rock", "Metal"] },
  ];
  
  assignStages(artists, stages);
  console.log(artists);
  