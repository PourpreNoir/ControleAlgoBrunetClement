function generateArtists(n) {
    const artists = [];
    for (let i = 0; i < n; i++) {
      artists.push({
        id: `id_${i}`,
        name: `Artist_${String.fromCharCode(65 + (i % 26))}${i}`, // Ex: Artist_A0, Artist_B1...
      });
    }
    return artists.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  const artists = generateArtists(100000); // 100 000 artistes pour tester la scalabilité
  console.log(artists.slice(0, 10)); // Vérification des premiers artistes

  function findArtistIndexOptimized(artists, name) {
    let left = 0;
    let right = artists.length - 1;
  
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (artists[mid].name === name) {
        return artists[mid].id;
      } else if (artists[mid].name < name) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1;
  }

  function findArtistIndex(artists, name) {
    for (let i = 0; i < artists.length; i++) {
      if (artists[i].name === name) {
        return artists[i].id;
      }
    }
    return -1;
  }