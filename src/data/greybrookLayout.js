export const GREYBROOK = {
  world: { width: 4200, height: 3000 },
  spawn: { x: 2080, y: 2650, facing: 'up' },

  districts: [
    { id: 'north', name: 'NORTH GATE DISTRICT', x: 2100, y: 330 },
    { id: 'craft', name: 'CRAFTSMEN WARD', x: 960, y: 950 },
    { id: 'market', name: 'MARKET WARD', x: 3150, y: 980 },
    { id: 'center', name: 'GREYBROOK TOWN SQUARE', x: 2100, y: 1450 },
    { id: 'civic', name: 'CIVIC QUARTER', x: 950, y: 1900 },
    { id: 'residential', name: 'RESIDENTIAL QUARTER', x: 3150, y: 1900 },
    { id: 'south', name: 'SOUTHERN FARMS', x: 2100, y: 2550 }
  ],

  roads: [
    { x: 2100, y: 1500, w: 260, h: 3000, kind: 'main' },
    { x: 2100, y: 1450, w: 3600, h: 240, kind: 'main' },
    { x: 1050, y: 900, w: 2000, h: 150, kind: 'side' },
    { x: 3150, y: 900, w: 2000, h: 150, kind: 'side' },
    { x: 1000, y: 2050, w: 1900, h: 150, kind: 'side' },
    { x: 3200, y: 2050, w: 1800, h: 150, kind: 'side' },
    { x: 1050, y: 900, w: 150, h: 1000, kind: 'side' },
    { x: 3150, y: 900, w: 150, h: 1000, kind: 'side' },
    { x: 1000, y: 2050, w: 150, h: 900, kind: 'side' },
    { x: 3200, y: 2050, w: 150, h: 900, kind: 'side' }
  ],

  water: [
    { id: 'greybrook-river', x: 3820, y: 1500, w: 520, h: 3000, label: 'GREYBROOK RIVER' },
    { id: 'mill-pond', x: 3500, y: 2430, w: 420, h: 360, label: 'MILL POND' }
  ],

  walls: [
    { x: 2100, y: 80, w: 3400, h: 90 },
    { x: 500, y: 650, w: 90, h: 1150 },
    { x: 3700, y: 650, w: 90, h: 1150 },
    { x: 650, y: 2800, w: 900, h: 70 },
    { x: 3550, y: 2800, w: 350, h: 70 }
  ],

  buildings: [
    { id: 'north-gate', name: 'North Gate', district: 'north', x: 2100, y: 180, w: 420, h: 150, type: 'gate', assetKey: 'building_north_gate' },
    { id: 'watchtower-west', name: 'West Watchtower', district: 'north', x: 1500, y: 300, w: 190, h: 190, type: 'tower', assetKey: 'building_watchtower' },
    { id: 'watchtower-east', name: 'East Watchtower', district: 'north', x: 2700, y: 300, w: 190, h: 190, type: 'tower', assetKey: 'building_watchtower' },
    { id: 'barracks', name: 'Greybrook Barracks', district: 'north', x: 1750, y: 560, w: 410, h: 250, type: 'civic', assetKey: 'building_barracks' },
    { id: 'stables', name: 'Town Stables', district: 'north', x: 2500, y: 570, w: 380, h: 240, type: 'utility', assetKey: 'building_stables' },

    { id: 'blacksmith', name: 'Ironroot Smithy', district: 'craft', x: 760, y: 820, w: 350, h: 250, type: 'craft', assetKey: 'building_blacksmith' },
    { id: 'carpenter', name: 'Carpenter Workshop', district: 'craft', x: 1250, y: 820, w: 350, h: 250, type: 'craft', assetKey: 'building_carpenter' },
    { id: 'tannery', name: 'Tannery', district: 'craft', x: 660, y: 1180, w: 300, h: 220, type: 'craft', assetKey: 'building_tannery' },
    { id: 'warehouse-west', name: 'West Warehouse', district: 'craft', x: 1220, y: 1180, w: 390, h: 230, type: 'warehouse', assetKey: 'building_warehouse' },
    { id: 'craft-house-1', name: 'Craftsman House', district: 'craft', x: 360, y: 920, w: 250, h: 190, type: 'house', assetKey: 'building_house_small' },
    { id: 'craft-house-2', name: 'Craftsman House', district: 'craft', x: 360, y: 1220, w: 250, h: 190, type: 'house', assetKey: 'building_house_small' },

    { id: 'general-store', name: 'Greybrook General Store', district: 'market', x: 2920, y: 780, w: 360, h: 250, type: 'shop', assetKey: 'building_general_store' },
    { id: 'bakery', name: 'Golden Loaf Bakery', district: 'market', x: 3370, y: 790, w: 320, h: 240, type: 'shop', assetKey: 'building_bakery' },
    { id: 'apothecary', name: 'Mira’s Apothecary', district: 'market', x: 2910, y: 1170, w: 340, h: 240, type: 'shop', assetKey: 'building_apothecary' },
    { id: 'tailor', name: 'Thread & Thistle', district: 'market', x: 3380, y: 1160, w: 300, h: 230, type: 'shop', assetKey: 'building_tailor' },
    { id: 'market-hall', name: 'Market Hall', district: 'market', x: 3150, y: 980, w: 420, h: 230, type: 'market', assetKey: 'building_market_hall' },

    { id: 'town-hall', name: 'Greybrook Town Hall', district: 'center', x: 1700, y: 1320, w: 420, h: 280, type: 'civic', assetKey: 'building_town_hall' },
    { id: 'inn', name: 'The Lantern & Brook', district: 'center', x: 2500, y: 1320, w: 420, h: 280, type: 'inn', assetKey: 'building_inn' },
    { id: 'guildhall', name: 'Adventurers’ Guild', district: 'center', x: 1700, y: 1650, w: 390, h: 250, type: 'guild', assetKey: 'building_guildhall' },
    { id: 'archive', name: 'Greybrook Archive', district: 'center', x: 2500, y: 1650, w: 390, h: 250, type: 'civic', assetKey: 'building_archive' },

    { id: 'temple', name: 'Shrine of the Dawn', district: 'civic', x: 690, y: 1800, w: 390, h: 300, type: 'temple', assetKey: 'building_temple' },
    { id: 'school', name: 'Greybrook Schoolhouse', district: 'civic', x: 1240, y: 1800, w: 420, h: 290, type: 'school', assetKey: 'building_school' },
    { id: 'clinic', name: 'Town Clinic', district: 'civic', x: 700, y: 2230, w: 330, h: 240, type: 'clinic', assetKey: 'building_clinic' },
    { id: 'old-library', name: 'Old Library', district: 'civic', x: 1240, y: 2230, w: 380, h: 260, type: 'library', assetKey: 'building_library' },

    { id: 'res-house-1', name: 'Residence', district: 'residential', x: 2800, y: 1770, w: 280, h: 210, type: 'house', assetKey: 'building_house_medium' },
    { id: 'res-house-2', name: 'Residence', district: 'residential', x: 3300, y: 1770, w: 280, h: 210, type: 'house', assetKey: 'building_house_medium' },
    { id: 'res-house-3', name: 'Residence', district: 'residential', x: 2800, y: 2180, w: 280, h: 210, type: 'house', assetKey: 'building_house_medium' },
    { id: 'res-house-4', name: 'Residence', district: 'residential', x: 3300, y: 2180, w: 280, h: 210, type: 'house', assetKey: 'building_house_medium' },
    { id: 'boarding-house', name: 'Boarding House', district: 'residential', x: 3550, y: 1980, w: 280, h: 300, type: 'house', assetKey: 'building_boarding_house' },

    { id: 'mill', name: 'Greybrook Mill', district: 'south', x: 3380, y: 2540, w: 360, h: 300, type: 'mill', assetKey: 'building_mill' },
    { id: 'farmhouse-west', name: 'West Farmhouse', district: 'south', x: 1150, y: 2580, w: 340, h: 240, type: 'farm', assetKey: 'building_farmhouse' },
    { id: 'farmhouse-east', name: 'East Farmhouse', district: 'south', x: 2750, y: 2600, w: 340, h: 240, type: 'farm', assetKey: 'building_farmhouse' },
    { id: 'south-gate', name: 'South Gate', district: 'south', x: 2100, y: 2820, w: 420, h: 150, type: 'gate', assetKey: 'building_south_gate' }
  ],

  landmarks: [
    { id: 'fountain', name: 'Founders’ Fountain', x: 2100, y: 1450, radius: 90, type: 'fountain', assetKey: 'landmark_fountain' },
    { id: 'notice-board', name: 'Town Notice Board', x: 2280, y: 1540, w: 70, h: 35, type: 'notice', assetKey: 'prop_notice_board' },
    { id: 'old-oak', name: 'The Old Oak', x: 1450, y: 1480, radius: 70, type: 'tree', assetKey: 'prop_old_oak' },
    { id: 'south-well', name: 'South Well', x: 1820, y: 2450, radius: 45, type: 'well', assetKey: 'prop_well' }
  ],

  farms: [
    { x: 650, y: 2590, w: 600, h: 320, label: 'WEST FIELDS' },
    { x: 2600, y: 2580, w: 620, h: 320, label: 'EAST FIELDS' }
  ],

  groves: [
    { x: 430, y: 1650, w: 420, h: 900, label: 'OLD GROVE' },
    { x: 3650, y: 520, w: 220, h: 700, label: 'RIVER TREES' }
  ],

  npcs: [
    { id: 'rowan', name: 'Rowan', role: 'Gate Warden', x: 2060, y: 470 },
    { id: 'mira', name: 'Mira', role: 'Apothecary', x: 2920, y: 1310 },
    { id: 'garrick', name: 'Old Garrick', role: 'Historian', x: 2440, y: 1770 },
    { id: 'elias', name: 'Elias', role: 'Blacksmith', x: 800, y: 990 },
    { id: 'maeve', name: 'Maeve', role: 'Innkeeper', x: 2500, y: 1500 },
    { id: 'orin', name: 'Orin', role: 'Town Clerk', x: 1740, y: 1490 }
  ]
};
