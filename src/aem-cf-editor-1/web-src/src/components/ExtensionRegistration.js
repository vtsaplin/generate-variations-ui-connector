/*
 * <license header>
 */

import { Text } from "@adobe/react-spectrum";
import { register } from "@adobe/uix-guest";
import { extensionId } from "./Constants";

function ExtensionRegistration() {
  const init = async () => {
    const guestConnection = await register({
      id: extensionId,
      methods: {
        headerMenu: {
          getButtons() {
            return [
              // @todo YOUR HEADER BUTTONS DECLARATION SHOULD BE HERE
              {
                id: 'test1',
                label: 'Test1',
                icon: 'OpenIn',
                async onClick() {
                  console.log("Button 'test1' has been pressed.");
                  const contentFragment = await guestConnection.host.contentFragment.getContentFragment();
                  console.log(contentFragment);
                  const context = guestConnection.sharedContext;
                  const aemHost = context.get("aemHost");
                  console.log(aemHost);
                },
              },
              {
                id: 'test2',
                label: 'Test2',
                icon: 'OpenIn',
                onClick() {
                  console.log("Button 'test2' has been pressed.");
                },
              },
            ];
          },
        },
      }
    });
  };
  init().catch(console.error);

  return <Text>IFrame for integration with Host (AEM)...</Text>;
}

export default ExtensionRegistration;
