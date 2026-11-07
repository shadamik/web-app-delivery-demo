import test from 'node:test';import assert from 'node:assert/strict';
import {releases,selectReleases,summarize} from '../src/releases.mjs';
test('search matches title regardless of case and surrounding whitespace',()=>{assert.deepEqual(selectReleases(releases,'  CHECKOUT ').map(x=>x.name),['Simpler checkout']);});
test('search matches product area',()=>{assert.equal(selectReleases(releases,'Commerce').length,2);});
test('unmatched search produces an empty list',()=>{assert.deepEqual(selectReleases(releases,'unknown'),[]);});
test('empty search returns all releases without mutating source',()=>{const snapshot=structuredClone(releases);assert.equal(selectReleases(releases).length,4);assert.deepEqual(releases,snapshot);});
test('summary calculates counts from data',()=>{assert.deepEqual(summarize(releases),{total:4,ready:2,checks:41});assert.deepEqual(summarize([]),{total:0,ready:0,checks:0});});
