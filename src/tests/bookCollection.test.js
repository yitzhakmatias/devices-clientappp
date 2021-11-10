import React from 'react';
import {StaticRouter} from "react-router";
import ClientCollection from "../clientCollections/pages/clientCollection";
import { mount } from 'enzyme'
import {flushRequestsAndUpdate} from "./testUtils";
import CollectionList from "../clientCollections/component/collectionList";
const renderBookListPage = () => mount(
    <StaticRouter context={{}}>
        <ClientCollection/>
    </StaticRouter>
)

describe('<ClientCollection>', () => {

    test('renders <CollectionList> after receiving response ', async () => {
        // given
        /*  httpMock.onGet('/talks').reply(200, [
              { id: 'id-1', title: 'any', speaker: 'any', category: 'any' },
          ])
          httpMock.onGet('/callForPapers').reply(200, {
              byTalkId: {
                  'id-1': { status: 'pending' },
              },
          })*/

        // when
        const tree = renderBookListPage()
        await flushRequestsAndUpdate(tree)

        // then
        expect(tree.find(CollectionList)).toExist()
    })
});

