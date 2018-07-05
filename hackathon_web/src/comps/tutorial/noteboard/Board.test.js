import notes from '../data/notes.json';

const noteData = notes.notes;

// number test
const noteItems = noteData.length;

test( 'Number of notes >= 3', () => {
  expect( noteItems ).toBeGreaterThanOrEqual( 3 );
} );

// String Test
const strTest = noteData[0].text;

test( 'There is Lisa in text', () => {
  expect( strTest ).toMatch( /lisa\b/ );
} );

test( 'There text contain Lisa', () => {
  expect( strTest ).toContain( 'Lisa'.toLowerCase() );
} );

// Array Test
const shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'beer'];

test( '购物清单（shopping list）里面有啤酒（beer）', () => {
  expect( shoppingList ).toContain( 'beer' );
} );

const expected = ['paper towels', 'beer'];
test( 'The List mentions beer & peper towels', () => {
  expect( shoppingList ).toEqual( expect.arrayContaining( expected ) );
  // expect.arrayContaining（array）匹配包含预期数组中所有元素的接收数组。
  // 也就是说，expected的数组是接收数组的一个子集。
} );

test( 'The List mentions not include Cookie', () => {
  expect( shoppingList ).not.toEqual( expect.arrayContaining( ['cookie'] ) );
} );


// Objects test
test( 'The last note have a property of Id', () => {
  expect( noteData[noteItems - 1] ).toHaveProperty( 'id' );
} );

test( 'The last note have a property of Id', () => {
  // .toHaveProperty(keyPath, value)
  expect( noteData[noteItems - 1] ).toHaveProperty( 'id', 35 );
} );
