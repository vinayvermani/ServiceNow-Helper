# ServiceNow-Helper
This contains the Server Side and Client Side Script to support ServiceNow common coding patterns


### Capture Order Guide on Request (sc_request)
#### Update Set - Capturing_Order_Guide_on_request.xml
This update set 
- creates a field on the request table
- and, a business rule to set it to order guide, if request contains items that trigger from order guide. This would set to first item that has order guide.

##### This is useful when you need to write workflows on Request that should be triggered if its for a specific Order guide. E.g. "New Hire" Order guide creates a request with bunch of items, where approval is only required on the request level and not on the item level. 
