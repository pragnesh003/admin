import React from 'react';
import { Card, CardHeader, CardHeaderToolbar } from './../../../../_metronic/_partials/controls';
import TicketSupportManagementTable from './ticketSupportManagementTable';

export const ticketSupportManagement = () => {
  return (
    <>
      <Card>
        <CardHeader title='Ticket/Support Management'>
          <CardHeaderToolbar>
            {/* <div className='d-flex flex-wrap ap_filter_wraper justify-content-end align-items-center'>
              <form
                className='subheader_filter'
                onSubmit={(e) => e.preventDefault()}
              >
                <div className='form-row'>
                  <div className='form-group mr-3 mb-1'>
                    <input
                      name='Search'
                      placeholder='Search. . .'
                      type='text'
                      className='form-control'
                    />
                  </div>
                </div>
              </form>
            </div> */}
          </CardHeaderToolbar>
        </CardHeader>
        <TicketSupportManagementTable />
      </Card>
    </>
  );
};
