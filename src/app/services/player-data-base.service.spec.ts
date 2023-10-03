import { TestBed } from '@angular/core/testing'
import { Player } from '../models/Player'
import { PlayerService } from './player-data-base.service'

describe('PlayerDataBaseService', () => {
  let service: PlayerService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PlayerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should add a player to the database', async () => {
    const player: Player = { id: 1, name: 'Luis', score: 100, maxScore: 200 }
    await service.addPlayer(player)
    const players = await service.getAllPlayers()
    expect(players).toContain(player)
  })

  it('should get a player by name', async () => {
    const player: Player = { id: 1, name: 'Luis', score: 100, maxScore: 200 }
    await service.addPlayer(player)
    const result = await service.getPlayerFromName('Luis')
    expect(result).toEqual(player)
  })

  it('should return 0 if player is not found', async () => {
    const result = await service.getPlayerIdFromName('Javi')
    expect(result).toEqual(0)
  })

  it('should return the player id if player is found', async () => {
    const player: Player = { id: 1, name: 'Luis', score: 100, maxScore: 200 }
    await service.addPlayer(player)
    const result = await service.getPlayerIdFromName('Luis')
    expect(result).toEqual(1)
  })
})
