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
                async onClick() {
                  const context = guestConnection.sharedContext;
                  const aemHost = context.get("aemHost");
                  console.log(`aemHost: ${aemHost}`);

                  const contentFragment = await guestConnection.host.contentFragment.getContentFragment();
                  console.log(`contentFragment: ${JSON.stringify(contentFragment)}`);

                  const fragmentId = contentFragment.fragmentId;
                  console.log(`fragmentId: ${fragmentId}`);

                  window.open(`https://experience-stage.adobe.com/?shell_ims=prod&aemHost=${aemHost}&fragmentId=${fragmentId}#/@sitesinternal/aem/generate-variations/`, "_blank");
                  // window.open(`https://experience-qa.adobe.com/?shell_source=local&devMode=true&shell_ims=prod&aemHost=${aemHost}&fragmentId=${fragmentId}#/@sitesinternal/aem/generate-variations/`, "_blank");
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
