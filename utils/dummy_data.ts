import type { User } from '~/types'

export const generateUsers = (total: number): User[] => {
  const sampleDevices = [
    'iPhone 13',
    'Windows 11',
    'MacBook Pro',
    'Android Phone',
    'iPad Air',
    'Samsung Galaxy S21',
    'Google Pixel 6',
    'Dell XPS 15',
    'Lenovo ThinkPad X1',
    'Huawei MateBook X Pro',
  ]
  const sampleBrowsers = ['Chrome', 'Safari', 'Firefox', 'Edge']
  const sampleEmails = [
    'john.doe',
    'jane.smith',
    'alice.brown',
    'bob.johnson',
    'charlie.miller',
    'david.wilson',
    'emily.davis',
    'frank.thomas',
  ].map((name) => `${name}@example.com`)
  const sampleIPs = [
    '192.168.1.',
    '192.168.2.',
    '172.16.0.',
    '10.0.0.',
    '192.168.100.',
    '10.1.1.',
    '172.16.5.',
    '192.168.50.',
    '10.0.1.',
    '192.168.200.',
  ]

  return Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    ip: `${sampleIPs[i % sampleIPs.length]}${Math.floor(Math.random() * 255) + 1}`,
    device: sampleDevices[i % sampleDevices.length],
    browser: sampleBrowsers[i % sampleBrowsers.length],
    time: new Date().toISOString(),
    email: sampleEmails[i % sampleEmails.length],
    active: Math.random() > 0.5,
  }))
}
