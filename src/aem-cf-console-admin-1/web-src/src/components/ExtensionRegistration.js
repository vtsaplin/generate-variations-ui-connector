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
        actionBar: {
          getButtons() {
            return [
              // YOUR ACTION BAR BUTTONS CODE SHOULD BE HERE
              {
                'id': 'generate-variations-action-bar',
                'label': 'Generate Variations',
                'icon': 'OpenIn',
                onClick(selections) {
                  console.log('selections', selections);
                },
              },
            ];
          },
        },
        headerMenu: {
          getButtons() {
            return [
              // YOUR HEADER BUTTONS CODE SHOULD BE HERE
              {
                'id': 'generate-variations-header-menu',
                'label': 'Generate Variations',
                'icon': 'OpenIn',
                onClick(params) {
                  console.log('params', params);
                  window.open("https://experience-qa.adobe.com/?shell_source=local&devMode=true&shell_ims=prod#/@sitesinternal/aem/generate-variations/", "_blank");
                },
              },
            ];
          },
        },
      },
    });
  };
  init().catch(console.error);

  return <Text>IFrame for integration with Host (AEM)...</Text>
}

export default ExtensionRegistration;
