# MAL-Sync Backup
The main purppose of this repository is have a backup of the <a href="https://github.com/MALSync/MALSync">MAL-Sync</a> MAL to Streaming page mapping database. But using the data for other uses is allowed. 
The data is updated once a week. Wrong/missing mappings are not seldom, specially mangas, but because they are generated throght all the users of MAL-Sync it should correct itself over time.

## Stats

<!--statstable-->
| Page        | Total | Malids | Empty |
| ----------- | ----- | ------ | ----- |
| 9anime      | 12433 | 12269  | 164   |
| Crunchyroll | 1945  | 1857   | 88    |
| Gogoanime   | 7170  | 7074   | 96    |
| Mangadex    | 47243 | 22431  | 24812 |
| MangaNelo   | 13718 | 8755   | 4963  |
| Twistmoe    | 1988  | 1969   | 19    |
| animepahe   | 3598  | 3596   | 2     |
| MangaFox    | 5077  | 3128   | 1949  |
| MangaSee    | 4535  | 3781   | 754   |
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
