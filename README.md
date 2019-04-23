# MAL-Sync Backup
The main purppose of this repository is have a backup of the <a href="https://github.com/lolamtisch/MALSync">MAL-Sync</a> MAL to Streaming page mapping database. But using the data for other uses is allowed. 
The data is updated once a week. Wrong/missing mappings are not seldom, specially mangas, but because they are generated throght all the users of MAL-Sync it should correct itself over time.

## Structure
### MAL -> Streaming Page Structure:
`Data2/(Malanime|Malmanga)/[id]`  
  
Data2/Malanime/19815
```json
{
  "Sites" : {
    "9anime" : {
      "4qkm" : "9anime",
      "y2p0" : "9anime"
    },
    "Anime4you" : {
      "779" : "Anime4you",
      "781" : "Anime4you"
    },
    "Crunchyroll" : {
      "no%20game%20no%20life" : "Crunchyroll"
    },
    "Gogoanime" : {
      "no-game-no-life" : "Gogoanime"
    },
    "Kissanime" : {
      "no-game-no-life" : "Kissanime",
      "no-game-no-life-dub" : "Kissanime"
    },
    "Netflix" : {
      "80052669" : "Netflix"
    },
    "Twistmoe" : {
      "no-game-no-life" : "Twistmoe"
    }
  },
  "image" : "https://cdn.myanimelist.net/images/anime/5/65187.jpg",
  "title" : "No Game No Life",
  "url" : "https://myanimelist.net/anime/19815/No_Game_No_Life"
}

```

### Streaming Page -> MAL Structure:  
`Data2/[streaming page key]/[id]`  
  
Data2/Netflix/80052669
```json
{
  "Mal" : {
    "19815" : "No_Game_No_Life"
  },
  "image" : "https://occ-0-2774-2773.1.nflxso.net/dnm/api/v5/rendition/8e167858e96558328f8ee56178face53f4345520/AAAABauzZX0uKYSRR7KcjTXdpJVXlK2u4fwcnYZNmjJYYdtM7qh_q4KfJSS_IMWfjmWBanad2gMNUScOADPviV72EFhQxpqrzZl7vLmLDIMo_SPeQjWsiPgQJ60nCMwbY8DbULuK9SLnMEVjrqnF8M04NTm814IwSs845Q.png",
  "title" : "No Game No Life",
  "url" : "https://www.netflix.com/title/80052669"
}

```

How to find the IDs can be checked in <a href="https://github.com/lolamtisch/MALSync/tree/master/src/pages">here</a>.  
`[PageKey]/main.ts -> (overview|sync):getIdentifier(url)`
