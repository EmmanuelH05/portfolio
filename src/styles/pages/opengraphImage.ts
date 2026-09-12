import type { CSSProperties } from 'react';

/** The size every scraper crops to. Twitter and LinkedIn both want 1.91:1. */
export const size = { width: 1200, height: 630 };

// Satori has no cascade and no default flex, so every box states its own layout.
export const canvas: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  padding: 40,
  backgroundColor: '#E6EAE1',
};

export const card: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '64px 72px',
  borderRadius: 28,
  backgroundColor: '#F4F6F0',
};

export const domain: CSSProperties = {
  margin: 0,
  fontSize: 24,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: '#2F6B4F',
};

export const body: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

/** Restrained on purpose: this reads as a name, not a billboard. */
export const name: CSSProperties = {
  margin: 0,
  fontSize: 76,
  lineHeight: 1.05,
  color: '#172019',
};

export const rule: CSSProperties = {
  width: 96,
  height: 3,
  margin: '28px 0',
  backgroundColor: '#2F6B4F',
};

export const role: CSSProperties = {
  margin: 0,
  maxWidth: 760,
  fontSize: 30,
  lineHeight: 1.4,
  color: '#56615A',
};

export const footer: CSSProperties = {
  display: 'flex',
  fontSize: 24,
  color: '#56615A',
};
