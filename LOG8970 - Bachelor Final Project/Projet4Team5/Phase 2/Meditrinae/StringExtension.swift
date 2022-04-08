//
//  StringExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-13.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

extension String {
//  func toDate(withFormat format: String = "yyyy-MM-dd'T'HH:mm:ss") -> Date {
//    
//    var str = self
//    if let dotRange = str.range(of: ".") {
//      str.removeSubrange(dotRange.lowerBound..<str.endIndex)
//    }
//    print(str)
//    let dateFormatter = DateFormatter()
//    dateFormatter.dateFormat = format
//    guard let date = dateFormatter.date(from: str) else {
//        return Date()
//        preconditionFailure("Take a look to your format")
//    }
//    return date
//  }
    
    var iso8601: Date? {
        return Formatter.iso8601.date(from: self)
    }
}
