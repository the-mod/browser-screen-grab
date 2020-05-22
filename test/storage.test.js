const storage = require('../app/storage');
const path = require('path');

test('getProjectRoot()', () => {
    expected = path.join(__dirname, '..');
    expect(storage.getProjectRoot()).toBe(expected);
});

test('getFileName()', () => {
    outDir = 'testDir';
    fileNamePrefix = 'testFile';
    fileNameSuffix = '1'
    expectedFileName = `${fileNamePrefix}-${fileNameSuffix}.png`;
    expectedPath = path.join(storage.getProjectRoot(), outDir, expectedFileName);
    expect(storage.getFileName(outDir, fileNamePrefix, fileNameSuffix)).toBe(expectedPath);
});

test('getFileNameWithTimestamp()', () => {
    outDir = 'testDir';
    fileNamePrefix = 'testFile';
    filePath = storage.getFilenameWithTimestamp(outDir, fileNamePrefix)
    fileName = path.basename(filePath)
    pattern = new RegExp(/testFile-\d{3}/)
    expect(fileName).toMatch(pattern);
});

test('isAbsolutePath() should return false for testPath', () => {
    outdir = 'testPath';
    expect(storage.isAbsolutePath(outdir)).toBe(false);
});

test('isAbsolutePath() should return true for /testPath', () => {
    outdir = '/testPath';
    expect(storage.isAbsolutePath(outdir)).toBe(true);
});

test('isAbsolutePath() should return true for C:\\testPath', () => {
    outdir = 'C:\\testPath';
    expect(storage.isAbsolutePath(outdir)).toBe(true);
});