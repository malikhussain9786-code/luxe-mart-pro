// Curated real product photography, sourced and verified from Unsplash.
// Each entry is a real, checked photo ID — not a random tag-routed
// service. Every URL here was confirmed to show the correct subject
// matter before being added (no mismatched or broken images).
//
// Subcategories without a dedicated curated pool fall back to a clean
// icon-card treatment (see ProductImage.jsx) rather than ever showing
// a wrong or broken photo.

function u(id, w = 700, h = 875) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const imagePools = {
  // ---- Jeans (unisex product shots) ----
  "mens-jeans": [
    u("1602293589930-45aad59ba3ab"),
    u("1714729382668-7bc3bb261662"),
    u("1542272604-787c3835535d"),
    u("1576995853123-5a10305d93c0"),
    u("1565084888279-aca607ecce0c"),
    u("1529391409740-59f2cea08bc6"),
  ],
  "womens-jeans": [
    u("1565084888279-aca607ecce0c"),
    u("1542272604-787c3835535d"),
    u("1529391409740-59f2cea08bc6"),
    u("1602293589930-45aad59ba3ab"),
    u("1714729382668-7bc3bb261662"),
  ],

  // ---- T-shirts ----
  "mens-tshirts": [
    u("1581655353564-df123a1eb820"),
    u("1583743814966-8936f5b7be1a"),
    u("1562157873-818bc0726f68"),
    u("1489987707025-afc232f7ea0f"),
    u("1523381294911-8d3cead13475"),
    u("1620799140408-edc6dcb6d633"),
    u("1571945153237-4929e783af4a"),
    u("1618354691373-d851c5c3a990"),
  ],

  // ---- Dress shirts ----
  "mens-shirts": [
    u("1603252109303-2751441dd157"),
    u("1602810318383-e386cc2a3ccf"),
    u("1602810316693-3667c854239a"),
    u("1598032895397-b9472444bf93"),
    u("1603252110481-7ba873bf42ab"),
    u("1602810319428-019690571b5b"),
  ],

  // ---- Jackets / coats ----
  "mens-jackets": [
    u("1551028719-00167b16eac5"),
    u("1706765779494-2705542ebe74"),
    u("1543076447-215ad9ba6923"),
    u("1727515546577-f7d82a47b51d"),
    u("1611312449408-fcece27cdbb7"),
  ],
  "womens-jackets": [
    u("1706765779494-2705542ebe74"),
    u("1543076447-215ad9ba6923"),
    u("1551028719-00167b16eac5"),
    u("1611312449408-fcece27cdbb7"),
  ],

  // ---- Sneakers (kept to non-visible-logo product shots where possible) ----
  "mens-sneakers": [
    u("1560769629-975ec94e6a86"),
    u("1525966222134-fcfa99b8ae77"),
    u("1595950653106-6c9ebd614d3a"),
    u("1512374382149-233c42b6a83b"),
    u("1549298916-b41d501d3772"),
  ],
  "womens-sneakers": [
    u("1560769629-975ec94e6a86"),
    u("1525966222134-fcfa99b8ae77"),
    u("1512374382149-233c42b6a83b"),
    u("1549298916-b41d501d3772"),
  ],
  "sports-shoes": [
    u("1560769629-975ec94e6a86"),
    u("1595950653106-6c9ebd614d3a"),
    u("1525966222134-fcfa99b8ae77"),
    u("1549298916-b41d501d3772"),
  ],

  // ---- Watches ----
  watches: [
    u("1523170335258-f5ed11844a49"),
    u("1524805444758-089113d48a6d"),
    u("1620625515032-6ed0c1790c75"),
    u("1542496658-e33a6d0d50f6"),
    u("1622434641406-a158123450f9"),
    u("1612817159949-195b6eb9e31a"),
    u("1533139502658-0198f920d8e8"),
    u("1582150264904-e0bea5ef0ad1"),
  ],

  // ---- Hoodies ----
  "mens-hoodies": [
    u("1680292783974-a9a336c10366"),
    u("1530475329205-1c5333ae40fb"),
    u("1596404129310-1ba3abeaed1e"),
    u("1519456264917-42d0aa2e0625"),
    u("1594656375376-64d56e2f3ed1"),
  ],

  // ---- Formal wear (suits/blazers) ----
  "mens-formal": [
    u("1592343516109-362f7bd871aa"),
    u("1598915850252-fb07ad1e6768"),
    u("1598808503746-f34c53b9323e"),
    u("1600091166971-7f9faad6c1e2"),
  ],
  "womens-formal": [
    u("1608234808654-2a8875faa7fd"),
    u("1617647858823-2424b6dc472f"),
  ],

  // ---- Wallets ----
  wallets: [
    u("1601592996763-f05c9c80a7f1"),
    u("1579014134953-1580d7f123f3"),
    u("1620109176813-e91290f6c795"),
    u("1624538000860-24716b9050f2"),
    u("1560472355-536de3962603"),
    u("1612023395494-1c4050b68647"),
  ],

  // ---- Handbags ----
  handbags: [
    u("1598532163257-ae3c6b2524b6"),
    u("1584917865442-de89df76afd3"),
    u("1600857062241-98e5dba7f214"),
    u("1705909237050-7a7625b47fac"),
    u("1590874103328-eac38a683ce7"),
    u("1605733513597-a8f8341084e6"),
    u("1559563458-527698bf5295"),
  ],

  // ---- Women's dresses ----
  "womens-dresses": [
    u("1640923160720-35dddb6348ab"),
    u("1567401893414-76b7b1e5a7a5"),
    u("1633077705107-8f53a004218f"),
    u("1616313253719-c46514cddee1"),
  ],

  // ---- Women's tops ----
  "womens-tops": [
    u("1584030373081-f37b7bb4fa8e"),
    u("1564257631407-4deb1f99d992"),
    u("1612889002991-fbfaf775d231"),
    u("1568732939097-b949d8c03cc1"),
  ],

  // ---- Boots ----
  "mens-boots": [
    u("1605733160314-4fc7dac4bb16"),
    u("1605812860427-4024433a70fd"),
    u("1608256246200-53e635b5b65f"),
    u("1550998358-08b4f83dc345"),
    u("1605732440685-d0654d81aa30"),
    u("1511283402428-355853756676"),
    u("1563433337461-5b65f0834f3a"),
    u("1534233650908-b471f2350922"),
  ],

  // ---- Heels ----
  "womens-heels": [
    u("1535043934128-cf0b28d52f95"),
    u("1581101767113-1677fc2beaa8"),
    u("1518049362265-d5b2a6467637"),
    u("1543163521-1bf539c55dd2"),
  ],

  // ---- Loafers (formal shoes / flats) ----
  "mens-formal-shoes": [
    u("1616406432452-07bc5938759d"),
    u("1662541089338-c7d53b88be70"),
    u("1615979474401-8a6a344de5bd"),
    u("1760616172899-0681b97a2de3"),
  ],
  "womens-flats": [
    u("1615979474401-8a6a344de5bd"),
    u("1760616172899-0681b97a2de3"),
    u("1616406432452-07bc5938759d"),
  ],

  // ---- Sunglasses ----
  sunglasses: [
    u("1511499767150-a48a237f0083"),
    u("1584036553516-bf83210aa16c"),
    u("1508296695146-257a814070b4"),
    u("1610136649349-0f646f318053"),
    u("1502767089025-6572583495f9"),
    u("1611222777277-61319d63ca94"),
    u("1567473810954-507d59716c25"),
    u("1608539733292-190446b22b83"),
    u("1589642380614-4a8c2147b857"),
    u("1653038282189-803202722a05"),
  ],

  // ---- Jewelry ----
  jewelry: [
    u("1589128777073-263566ae5e4d"),
    u("1635767798638-3e25273a8236"),
    u("1599643478518-a784e5dc4c8f"),
    u("1602173574767-37ac01994b2a"),
    u("1685970731194-e27b477e87ba"),
    u("1685970731571-72ede0cb26ea"),
  ],

  // ---- Belts ----
  belts: [
    u("1664286074176-5206ee5dc878"),
    u("1711443982852-b3df5c563448"),
    u("1705493655920-20c572928501"),
    u("1624222247344-550fb60583dc"),
    u("1734383524180-3c6f9b21e8e3"),
    u("1611937685025-8d1df67a80b6"),
  ],

  // ---- Fitness equipment ----
  "fitness-equipment": [
    u("1638536532686-d610adfc8e5c"),
    u("1672344048213-76b6e77304bd"),
    u("1685633224688-6a77675eb119"),
    u("1576678927484-cc907957088c"),
    u("1623874228601-f4193c7b1818"),
    u("1725289767222-3444016c70ce"),
    u("1703668984128-b506579acdd2"),
    u("1561729955-89357c733059"),
  ],
};

export function hasCuratedPool(subcategoryId) {
  return Boolean(imagePools[subcategoryId]?.length);
}

export function getPoolImage(subcategoryId, index) {
  const pool = imagePools[subcategoryId];
  if (!pool || pool.length === 0) return null;
  return pool[index % pool.length];
}
