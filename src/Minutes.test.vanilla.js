import React from "react";
import {
  Minutes as MinutesRoot,
  MinutesAdd,
  MinutesSubtract,
  MinutesInput,
} from "./Minutes";
import * as TestRenderer from "react-test-renderer";

// Just run our script immediately. We'll define it below!
main();

// We want to write a simple unit test to make sure our Minutes component works
// as expected.

// First of all, we are going to run this test in node, so let's start by
// assuming we aren't using any thid-party tools at this point and just want to
// make some assertions by running a script directly.
function main() {
  console.log("running tests...");

  // Now we need something that can render our component We used babel so that
  // Node can understand React syntax, but we don't have any way to render our
  // components in a way that Node can evaluate its state or output or run
  // assertions.
  //
  // We are also using TypeScript so we need something to transform that as
  // well, so we can use the babel transformer for that. Alternativelt we might
  // use ts-node instead of plain node, but we'd still have to deal with JSX so
  // babel simplifies this a bit.
  //
  // Lastly, some of our code imports css and sass for styling, which is a
  // problem since they aren't valid JS and Node will throw. We need to stub
  // those imports somehow. For simplicity here we will use Babel to do all of
  // this stuff for us. You can check the script we're running from package.json
  // and see it point to a babel config in the scripts directory.
  //
  // In the DOM we use ReactDOM, and in a test environment we probably want to
  // reach for something similar but designed for node. For now we'll start with
  // React Test Renderer. Create the renderer for our test first.
  const testRenderer = TestRenderer.create(<Minutes value={5} />);

  // Just to start, let's see what the renderer gives us as a JSON object.
  // Uncomment these if you want to inspect the output
  // let tree = testRenderer.toJSON();
  // console.log(tree);

  // The renderer here can do some other nice things for us. Let's get an
  // instance of the renderer we can use to quickly access items  in the
  // rendered results tree.
  let testInstance = testRenderer.root;

  // When we render this component we can see we have an object representation
  // of the DOM tree that the component renders.

  // What we probably want right out of the gate is a test that makes sure that
  // a valid minutes prop renders the value to the input.

  // We can see we have a reference to the input in our rendered object.
  // TestRenderer has a handy utility we can use to snag a reference to that
  // because we know the type of our input is...an input.
  let input = testInstance.findByType("input");

  // Now we can check that the value that was ultimately passed to our input
  // matches the value we passed to the minutes prop in the Minutes component
  // when we rendered it to our instance.
  //
  // Let's write a handy assertion function here for a nice readable statement
  // for our tests.
  expect(input.props.value).toBe(5);

  // If we make it to here, we're finished!
  console.log("Tests passed!");

  // Now we have a working test for this case! But this wasn't a ton of fun so
  // let's try bringing in some tooling instead :)
}

function Minutes({ "aria-labelledby": ariaLabelledBy, ...props }) {
  return (
    <MinutesRoot {...props}>
      <MinutesSubtract aria-label="Subtract" />
      <MinutesInput />
      <MinutesInput aria-labelledby={ariaLabelledBy} />
      <MinutesAdd aria-label="Add" />
    </MinutesRoot>
  );
}
