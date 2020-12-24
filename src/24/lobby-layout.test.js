const test = require('ava').default
const { part1, part2 } = require('./lobby-layout')

const input = [
  'sesenwnenenewseeswwswswwnenewsewsw',
  'neeenesenwnwwswnenewnwwsewnenwseswesw',
  'seswneswswsenwwnwse',
  'nwnwneseeswswnenewneswwnewseswneseene',
  'swweswneswnenwsewnwneneseenw',
  'eesenwseswswnenwswnwnwsewwnwsene',
  'sewnenenenesenwsewnenwwwse',
  'wenwwweseeeweswwwnwwe',
  'wsweesenenewnwwnwsenewsenwwsesesenwne',
  'neeswseenwwswnwswswnw',
  'nenwswwsewswnenenewsenwsenwnesesenew',
  'enewnwewneswsewnwswenweswnenwsenwsw',
  'sweneswneswneneenwnewenewwneswswnese',
  'swwesenesewenwneswnwwneseswwne',
  'enesenwswwswneneswsenwnewswseenwsese',
  'wnwnesenesenenwwnenwsewesewsesesew',
  'nenewswnwewswnenesenwnesewesw',
  'eneswnwswnwsenenwnwnwwseeswneewsenese',
  'neswnwewnwnwseenwseesewsenwsweewe',
  'wseweeenwnesenwwwswnew'
]

test('part 1', (t) => {
  t.is(part1(input), 10)
})

test('part 2', (t) => {
  t.is(part2(input), 2208)
})
