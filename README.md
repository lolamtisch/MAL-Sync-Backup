# MAL-Sync Backup
The main purppose of this repository is have a backup of the <a href="https://github.com/MALSync/MALSync">MAL-Sync</a> MAL to Streaming page mapping database. But using the data for other uses is allowed. 
The data is updated once a week. Wrong/missing mappings are not seldom, specially mangas, but because they are generated throght all the users of MAL-Sync it should correct itself over time.

## Stats

<!--statstable-->
| Page        | Total | Malids | Empty |
| ----------- | ----- | ------ | ----- |
| 9anime      | 11917 | 11780  | 137   |
| Anime4you   | 3648  | 3507   | 141   |
| Aniwatch    | 2966  | 2959   | 7     |
| Crunchyroll | 1355  | 1295   | 60    |
| Gogoanime   | 6336  | 6276   | 60    |
| Mangadex    | 44300 | 21794  | 22506 |
| MangaNelo   | 11162 | 7605   | 3557  |
| Twistmoe    | 1925  | 1913   | 12    |
| animepahe   | 2341  | 2340   | 1     |
| MangaFox    | 1115  | 663    | 452   |
| MangaSee    | 1247  | 1018   | 229   |
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
