# MAL-Sync Backup
The main purppose of this repository is have a backup of the <a href="https://github.com/MALSync/MALSync">MAL-Sync</a> MAL to Streaming page mapping database. But using the data for other uses is allowed. 
The data is updated once a week. Wrong/missing mappings are not seldom, specially mangas, but because they are generated throght all the users of MAL-Sync it should correct itself over time.

## Stats

<!--statstable-->
| Page        | Total | Malids | Empty |
| ----------- | ----- | ------ | ----- |
| 9anime      | 11622 | 11498  | 124   |
| Anime4you   | 3559  | 3417   | 142   |
| Aniwatch    | 2793  | 2785   | 8     |
| Crunchyroll | 1066  | 1016   | 50    |
| Gogoanime   | 6026  | 5970   | 56    |
| Mangadex    | 42674 | 21457  | 21217 |
| MangaNelo   | 10401 | 7246   | 3155  |
| Twistmoe    | 1895  | 1883   | 12    |
| animepahe   | 392   | 391    | 1     |
| MangaFox    | 26    | 15     | 11    |
| MangaSee    | 35    | 29     | 6     |
<!--/statstable-->

## Structure

| :warning: WARNING: firebase.json has been deprecated! |
| --- |

### MAL -> Streaming Page Structure:
`mal.json -> /(anime|manga)/[id]`  
  
anime/19815
```json
{
  "altTitle": [
    "No Game, No Life",
    "NGNL",
    "ノーゲーム・ノーライフ"
  ],
  "id": 19815,
  "type": "anime",
  "title": "No Game No Life",
  "url": "https://myanimelist.net/anime/19815/No_Game_No_Life",
  "image": "https://cdn.myanimelist.net/images/anime/5/65187.jpg",
  "category": "TV",
  "hentai": false,
  "createdAt": "2020-10-12T12:36:13.580Z",
  "updatedAt": "2020-10-15T11:36:06.203Z",
  "Pages": {
    "Aniwatch": {
      "350": {
        "...": "..."
      }
    },
    "9anime": {
      "4qkm": {
        "...": "..."
      },
      "y2p0": {
        "...": "..."
      }
    },
    "Gogoanime": {
      "no-game-no-life": {
        "...": "..."
      },
      "no-game-no-life-dub": {
        "...": "..."
      }
    },
    "Twistmoe": {
      "no-game-no-life": {
        "...": "..."
      }
    }
  }
}

```

### Streaming Page -> MAL Structure:  
`page.json -> [streaming page key]/[id]`  
  
9anime/214
```json
{
  "identifier": "214",
  "malUrl": "https://myanimelist.net/anime/9617/K-On_Movie",
  "type": "anime",
  "page": "9anime",
  "title": "K-On! Movie",
  "url": "...",
  "image": "....",
  "hentai": false,
  "sticky": false,
  "active": true,
  "actor": null,
  "malId": 9617,
  "createdAt": "...",
  "updatedAt": "...",
  "Mal": {
    "altTitle": [],
    "id": 9617,
    "type": "anime",
    "title": "K-On! Movie",
    "url": "...",
    "image": "...",
    "category": "-",
    "hentai": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
}

```

How to find the IDs can be checked in <a href="https://github.com/lolamtisch/MALSync/tree/master/src/pages">here</a>.  
`[PageKey]/main.ts -> (overview|sync):getIdentifier(url)`
