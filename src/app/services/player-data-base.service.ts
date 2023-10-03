import { Injectable } from '@angular/core'
import { openDB, DBSchema } from 'idb'
import { Player } from '../models/Player'

export interface PlayerDatabase extends DBSchema {
  players: {
    key: number
    value: Player
    indexes:
    { 'score': number
      'name': string }
  }
}

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  private readonly dbPromise = openDB<PlayerDatabase>('PlayerDatabase', 1, {
    upgrade (db) {
      const playerStore = db.createObjectStore('players', { keyPath: 'id', autoIncrement: true })
      playerStore.createIndex('score', 'score', { unique: false })
      playerStore.createIndex('name', 'name', { unique: true })
    }
  })

  async addPlayer (player: Player): Promise<void> {
    const db = await this.dbPromise
    await db.put('players', player)
  }

  async getAllPlayers (): Promise<Player[]> {
    const db = await this.dbPromise
    const players = await db.getAll('players')
    return players
  }

  async getPlayerFromName (name: string): Promise<Player> {
    const db = await this.dbPromise
    const player = await db.getFromIndex('players', 'name', name)
    return player ?? { name: '', score: 0, maxScore: 0 }
  }

  async getPlayerIdFromName (name: string): Promise<number> {
    const db = await this.dbPromise
    const player = await db.getFromIndex('players', 'name', name)
    return player?.id ?? 0
  }
}
