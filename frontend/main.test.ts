/*
 *
 * OSIS stands for Open Student Information System. It's an application
 * designed to manage the core business of higher education institutions,
 * such as universities, faculties, institutes and professional schools.
 * The core business involves the administration of students, teachers,
 * courses, programs and so on.
 *
 * Copyright (C) 2015-2023 Université catholique de Louvain (http://www.uclouvain.be)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * A copy of this license - GNU General Public License - is available
 * at the root of the source code of this program.  If not,
 * see http://www.gnu.org/licenses/.
 *
 */

import {expect, test, vi} from 'vitest';
/* eslint-disable vue/prefer-import-from-vue */
import * as exports from '@vue/runtime-dom';
import HistoryViewer from "./HistoryViewer.vue";
import fetchMock from "fetch-mock";
import {createApp} from "vue";


declare global {
  interface Window {
    customOnHeadersRenderTable: CallableFunction,
  }
}

// importing main, which has an export, can be done only once, so we put two tests in one
test('mount app with conversions', async () => {
  fetchMock.reset().mock('path:/api', []);
  window.customOnHeadersRenderTable = () => ``;
  document.body.innerHTML = `
  <div
    class="history-viewer"
    data-url="/api"
  ></div>
  <div
    class="history-viewer"
    data-url="/api"
    data-modes="table,horizontal"
    data-on-headers-render-table="customOnHeadersRenderTable"
  ></div>`;

  const spy = vi.spyOn(exports, 'createApp').mockImplementation(createApp);

  // Executes main file
  const main = await import('./main');
  expect(main).toHaveProperty('filterXssAndFormat');
  expect(document.body.innerHTML).toMatchSnapshot();

  const pElement = document.querySelectorAll('[data-v-app]');
  expect(pElement).toHaveLength(2);

  expect(spy).toBeCalledTimes(2);
  expect(spy).toHaveBeenCalledWith(HistoryViewer, {
    url: '/api',
  });
  expect(spy).toHaveBeenCalledWith(HistoryViewer, {
    url: '/api',
    modes: ["table", "horizontal"],
    onHeadersRenderTable: window.customOnHeadersRenderTable,
  });
});

