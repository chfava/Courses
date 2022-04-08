//
//  DateExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-13.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

//extension Date {
//    func toString() -> String {
//        let dateformatter = DateFormatter()
//        dateformatter.dateStyle = DateFormatter.Style.medium
//        dateformatter.timeStyle = DateFormatter.Style.none
//        return dateformatter.string(from: self)
//    }
//}

extension ISO8601DateFormatter {
    convenience init(_ formatOptions: Options, timeZone: TimeZone = TimeZone(secondsFromGMT: 0)!) {
        self.init()
        self.formatOptions = formatOptions
        self.timeZone = timeZone
    }
}

extension Formatter {
    static let iso8601 = ISO8601DateFormatter([.withInternetDateTime, .withFractionalSeconds])
}

extension Date {
    var iso8601: String {
        return Formatter.iso8601.string(from: self)
    }
    func print() -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .medium
        dateFormatter.timeStyle = .none
        return dateFormatter.string(from: self)
    }
    func calculateAge() -> DateComponents {
        let today = Date()
        let calendar = Calendar.current
        let components = calendar.dateComponents([.year, .month, .day], from: self, to: today)
        return components
    }
}

extension String {
    var iso8601: Date? {
        return Formatter.iso8601.date(from: self)
    }
}
